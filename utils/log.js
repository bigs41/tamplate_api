const winston = require('winston')
const moment = require('moment-timezone')

require('winston-daily-rotate-file')
const path = require('path')
const CONF = require('../config')
var logger = winston.createLogger({
  transports: [
    new (winston.transports.DailyRotateFile)({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      level: (CONF.NODE_ENV === 'production') ? 'info' : 'debug',
      zippedArchive: false,
      dirname: path.join(__dirname, '../logs'),
      maxSize: '1g',
      maxFiles: CONF.logMaxFile
    }),
    new (winston.transports.DailyRotateFile)({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      level: 'error',
      zippedArchive: false,
      dirname: path.join(__dirname, '../logs/error'),
      maxSize: '1g',
      maxFiles: CONF.logErrorMaxFile
    })
  ]
})

logger.add(
  new (winston.transports.Console)({
    format: winston.format.combine(
      winston.format.cli(),
      winston.format.printf(info => {
        if (CONF.NODE_ENV === 'production') { return `${moment().toISOString()} ${info.level}: ${info.message}` } else { return `${info.level}: ${info.message}` }
      })
    ),
    level: CONF.log || (CONF.NODE_ENV === 'production') ? 'error' : 'info'
  })
)

if (CONF.NODE_ENV === 'production') {
  if (CONF.logErrorEmail) {
    logger.add(
      new (winston.transports.Mail)({
        format: winston.format.simple(),
        to: CONF.logErrorEmail,
        from: CONF.mailUser,
        host: CONF.mailHost,
        port: CONF.mailPort,
        username: CONF.mailUser,
        password: CONF.mailPass,
        prefix: CONF.logErrorEmailPrefix,
        timestamp: true,
        level: 'warn',
        maxBufferTimeSpan: CONF.logErrorEmailMaxBufferTimeSpan,
        maxBufferItems: CONF.logErrorEmailMaxBufferItems
      })
    )
  }
}

if (CONF.elasticsearch) {
  const Elasticsearch = require('winston-elasticsearch')

  logger.add(
    new Elasticsearch({
      level: 'info',
      indexPrefix: 'mlearn-log',
      client: require('./elasticsearch')
    })
  )
}

module.exports = logger
