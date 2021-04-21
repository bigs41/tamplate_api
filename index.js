/* eslint-disable valid-typeof */
const express = require('express')
const path = require('path')
const CONF = require('./config')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const _ = require('lodash')
const log = require('./utils/log')
const shelljs = require('shelljs')
const uuid = require('uuid').v4
const find = require('find')
const changeCase = require('change-case')
const ResponseError = require('./utils/ResponseError')
const cors = require('cors')
const seq = require('./db')
var cron = require('node-cron');


shelljs.mkdir('-p', [path.resolve(__dirname, './data/selflearning')])
shelljs.mkdir('-p', [path.resolve(__dirname, './data/profile')])
shelljs.mkdir('-p', [path.resolve(__dirname, './data/tmp')])
// cron.schedule('*/2 * * * *', async () => {

// });
module.exports = async (app, urlPath = '/') => {
  if (!app) app = express()

  await require('./models')
  const help = require('./utils/helpers')

  if (CONF.NODE_ENV === 'production') await seq.query('SELECT 1')

  await require('./init')()
  app.use(cookieParser());
  app.use(require('./utils/session'))

  app.use(express.json({
    limit: '800mb'
  }))

  app.use(bodyParser.urlencoded({
    extended: false,
    limit: '800mb'
  }))

  app.use(cors())

  app.use(function (req, res, next) {
    try {
      req.headers['X-Request-Id'] = uuid()
      req.headers['X-Apm-Id'] = req.headers['X-Apm-Id'] || uuid()
      res.set('X-Request-Id', req.headers['X-Request-Id'])
      res.set('X-Apm-Id', req.headers['X-Apm-Id'])
      res.pagination = function (obj) {
        let body = obj
        if (obj.data != undefined && obj.list_page != undefined) {
          body = obj.data
          delete obj.list_page
          for (const [key, val] of Object.entries(obj)) {
            if (key != 'data') {
              let headName = key.replace(/_/g, '-')
              let value = typeof val == 'object' ? JSON.stringify(val) : val
              this.set(`X-${headName}`, value)
            }
          }
        }
        if (!this.get('Content-Type')) {
          this.set('Content-Type', 'application/json');
        }
        return this.send(JSON.stringify(body));
      }
      next()
    } catch (e) {
      next(e)
    }
  })

  app.use(urlPath, async (req, res, next) => {
    try {

      var __super = res.json
      res.json = function () {
        return __super.apply(this, [...arguments])
      }
      next()
    } catch (e) {
      next(e)
    }
  })

  app.use(urlPath, (req, res, next) => {
    try {
      var debug = require('debug')('mlearn')
      debug('URL: ' + req.originalUrl)
      req.body = Object.assign(req.body || {}, req.query)
      req.input = _.merge(req.body, req.query)
      req._body = function (key, type = String, def, enumValues) {
        let r
        if (key === undefined) {
          return this.body
        } else if (key === null || key === '') {
          if (req.body._) {
            return req._body('_', type, def, enumValues)
          }
          if (type === Array) {
            r = [req.body]
          } else {
            r = req.body
          }
        } else {
          r = _.get(req.body, key, def)
        }

        if (typeof r !== type) {
          if (type === Number) {
            if (Number.isNaN(r)) {
              r = undefined
            } else {
              r = parseFloat(r)
            }
          } else if (type === Array) {
            if (!Array.isArray(r)) {
              if (/^\[/.test(r)) {
                r = JSON.parse(r)
              } else if (typeof r === 'number') {
                r = [r]
              } else {
                r = (r + '').split(',').map(d => d.trim())
              }
            }
          } else if (type === Object) {
            if (typeof r === 'string') {
              if (/^\{/.test(r)) {
                r = JSON.parse(r)
              }
            }
          } else if (type === String) {
            if (typeof r === 'object') {
              r = JSON.parse(r)
            }
          }

          if (enumValues) {
            if (/[0-9]+/gmi.test(r)) {
              if (!enumValues[parseInt(r)]) {
                r = null
              }
            } else {
              if (!enumValues.find(v => v === r)) {
                r = null
              }
            }
          }

          _.set(req.body, key, r)
        }
        return r
      }

      req.log = function (m, a = {}, c) {
        try {
          if (CONF.NODE_ENV === 'test') return

          const r = {
            requestId: req.headers['X-Request-Id'],
            route: req.baseUrl + req.path
          }

          if (req.files) {
            r.files = []
            for (const f in req.files) {
              r.files.push({
                [f]: req.files[f].md5
              })
            }
          }

          return require('./utils/ActivityLog').info(m, {
            data: Object.assign(r, a)
          }, c)
        } catch (e) {
          log.error(e)
        }
      }

      req.error = function (m, a = {}, c) {
        try {
          const r = {
            requestId: req.headers['X-Request-Id'],
            route: req.baseUrl + req.path
          }
          r.commitId = process.env.CI_COMMIT_SHA

          if (req.files) {
            r.files = []
            for (const f in req.files) {
              r.files.push({
                [f]: req.files[f].md5
              })
            }
          }

          return require('./utils/ActivityLog').error(m, {
            data: Object.assign(r, a)
          }, c)
        } catch (e) {
          log.error(e)
        }
      }

      next()
    } catch (e) {
      next(e)
    }
  })

  var normalizedPath = require('path').join(__dirname, 'routes')

  const files = find
    .fileSync(normalizedPath)
    .filter(f => !/__.*|__snapshots__|\.spec\./gmi.test(f))
    .sort((a, b) => (a > b ? -1 : 1))

  for (let file of files) {
    file = path.relative(normalizedPath, file).replace(/\\/gmi, '/')

    try {
      const p = (urlPath === '/' ? '/' : urlPath + '/') + file.split('.')[0].replace(/\/index$/gmi, '').replace(/\/_(\w+)/gmi, '/:$1')
      const f = './' + path.relative(__dirname, path.join(normalizedPath, file))

      app.use([p, p.split('/').map(s => changeCase.paramCase(s)).join('/')], require(f))
    } catch (e) {
      console.log((urlPath === '/' ? '/' : urlPath + '/') + file.split('.')[0])
      throw e
    }
  }

  app.use(urlPath, function (req, res, next) {
    try {
      if (!res.headerSent && res.data !== undefined) {
        if (res.data == null) {
          res.sendStatus(404)
        } else {
          res.json(res.data)
        }
      } else {
        next()
      }

    } catch (e) {
      next(e)
    }
  })

  // error handler
  app.use(urlPath, function (err, req, res, next) {
    if (!res.headerSent) {
      if (err instanceof ResponseError) {
        if (/text\/html/.test(req.get('Accept'))) {
          res.status(err.status).send(`<pre>${JSON.stringify(err.toJson(), null, 2)}</pre>`)
        } else {
          res.status(err.status).json(err.toJson())
        }
      } else {
        if (/text\/html/.test(req.get('Accept'))) {
          res.status(500).send(`<pre>${err.stack}</pre>`)
        } else {
          res.status(500).send(err.stack)
        }
      }
    }

    var params = _.extend({}, req.body)
    for (const p in params) {
      if (/password/gmi.test(p)) {
        params[p] = '********'
      }
    }
    if (process.env.NODE_ENV === 'test' || process.env.OS !== 'docker') {
      console.error(err)
    }

    req.error && req.error(err.message, {
      params: params,
      stack: err.stack
    })
  })

  return app
}