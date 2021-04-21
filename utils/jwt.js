const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const CONF = require('../config')

const defaultOptions = {
  expiresIn: '7d'
}

module.exports = {
  sign(payload, options = defaultOptions) {
    if (payload) {
      delete payload.exp
    }
    return jwt.sign(payload, CONF.JWT_SECRET, { ...defaultOptions, ...options })
  },
  verify(token, options = defaultOptions) {
    return jwt.verify(token, CONF.JWT_SECRET, { ...defaultOptions, ...options })
  },
  decode(token, options = defaultOptions) {
    return jwt.decode(token, { ...defaultOptions, ...options })
  }
}