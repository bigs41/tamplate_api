const session = require('express-session')
const path = require('path')
const fs = require('fs')
const MySQLStore = require('express-mysql-session')(session)
const conf = require('../config')

const secret = conf.SESSION_SECRET

let store
// if (conf.nodeEnv === 'production') {
store = new MySQLStore({
  host: conf.DB_HOST,
  port: conf.DB_PORT,
  database: conf.DB_NAME,
  user: conf.DB_USER,
  password: conf.DB_PASS
})

module.exports = session({
  secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    secure: false,
    expires: 1000 * 60 * 60 * 24 * 2,
    maxAge: 1000 * 60 * 60 * 24 * 30
  },
  store
})