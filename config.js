const path = require('path')
const shelljs = require("shelljs")
const fs = require('fs')

let CONF = {
  NODE_ENV: 'devlopment',
  ROOT_PASSWORD: '$2y$12$8laEKBl4sDMVxPXQdLE6g.WEjqLMPWt6LxMFfMEHyLosYktIJLZY6',
  SYS: {},
  PORT: 8080,
  JWT_SECRET: 'adshgj34tgjiekyf',
  REDIS_URL: null,
  SOCKET_IO: {
    PING_INTERVAL: 30000,
  },
  DB_NAME: 'platform',
  DB_USER: 'root',
  DB_PASS: 'root',
  DB_HOST: '127.0.0.1',
  DB_DIALECT: 'mysql',
  DB_DIRECTORY: false,
  VERIFY_EMAIL: true,
  DB_PORT: '3309',
  FORGOT_PASSWORD_EXPIRE: 180,
  SESSION_SECRET: 'changeme'
}


if (process.env.NODE_ENV != 'production' && fs.existsSync(path.resolve(__dirname, './config.dev.js'))) {
  CONF = Object.assign(CONF, require(path.resolve(__dirname, './config.dev.js')))
} else if (fs.existsSync(path.resolve(__dirname, './config.prod.js'))) {
  CONF = Object.assign(CONF, require(path.resolve(__dirname, './config.prod.js')))
}

CONF = require('config')(CONF)
  .env()
  .js()
  .argv()
  .exec()

module.exports = CONF
