(async () => {
  const argv = require('yargs').argv
  const CONF = require('./config')
  await CONF.initialize()
  const log = require('./utils/log')
  const exitHook = require('async-exit-hook')
  const express = require('express')
  const path = require('path')
  const apm = require('elastic-apm-node')
  const _ = require('lodash')
  const cluster = require('cluster')
  const os = require('os')
  const https = require('https');
  const fs = require('fs')
  const compression = require('compression')
  const axios = require('axios')
  const WebServer = require('node-web-worker/v2')

  if (!_.isEmpty(CONF.APM)) {
    axios.get(CONF.APM.SERVER_URL)
      .then(() => {
        apm.addTransactionFilter(function (transaction) {
          if (transaction.type === 'request' && _.has(transaction, 'context.request')) {
            const req = transaction.context.request
            if (/^\/api\//gmi.test(req.url.pathname) && !/:/gim.test(transaction.name)) {
              transaction.name = `${req.method} ${req.url.pathname}`
            }

            if (/^\/data\//gmi.test(req.url.pathname)) {
              transaction.name = `${req.method} static file`
            }
          }
          return transaction
        })
        apm.start({
          ...CONF.toCamelCase('APM'),
          captureBodyedit: 'all',
          ignoreUrls: ['/healthcheck']
        })
      })
      .catch(e => console.warn(e))
  }

  const app = await require('./index')(null, '/api')
  app.use('/app', express.static('app', {
    index: ['index.html', 'index.htm']
  }))

  app.use('/healthcheck', (req, res, next) => {
    res.status(200).end()
  })

  app.use('/', compression(), express.static(path.resolve(__dirname, './static')))
  app.use('/', compression(), express.static(path.resolve(__dirname, './dist')))

  app.all('/openapi.yaml', async (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'openapi.yaml'), {
      root: __dirname
    })
  })

  const swaggerUi = require('swagger-ui-express')
  const YAML = require('yamljs')

  const swaggerDocument = YAML.load(path.resolve(__dirname, './openapi.yaml'))

  app.use(['/api-docs', '/api-docs.html'], swaggerUi.serve, swaggerUi.setup(swaggerDocument))


  app.all(['/api-docs', '/api-docs.html'], async (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'api-docs.html'), {
      root: __dirname
    })
  })

  app.use('/', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, './dist/index.html'));
  })

  const webServer = new WebServer({
    app: () => app,
    httpPort: CONF.PORT,
    productionWorker: process.env.CPUS || 2,
    ...CONF.WEB_SERVER
  })

  await require('./utils/socket').getInstance(await webServer.getServer())

  webServer.listen(() => {
    console.log(`Server listening on https://localhost:${CONF.PORT}`)
  })


  exitHook(done => {
    log.info('httpServer stop')
    process.nextTick(() => {
      done()
    })
  })
})().catch(e => {
  console.error(e)
  process.exit(1)
})