const fs = require('fs')
const path = require('path');
const files = fs.readdirSync(path.resolve(__dirname, './models'))
const bcrypt = require('./utils/bcrypt')
const _ = require('lodash')
const CONF = require('./config')

Object.defineProperty(Array.prototype, 'joinLast', {
  value: function (str, lastStr = '') {
    if (this.length > 1)
      return _.initial(this).join(str) + lastStr + _.last(this)
    else
      return this.join('')
  }
})

module.exports = (async (seq = require('./db')) => {
  for (var f of files) {
    seq.import(path.resolve(__dirname, './models', f))
  }

  const help = require('./utils/helpers')
})()