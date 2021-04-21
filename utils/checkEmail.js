const conf = require('../config')
const verifier = require('email-verify')

if (conf.nodeEnv == 'test') {
  module.exports = jest.fn(() => true)
} else {
  module.exports = async function (email) {
    return new Promise((resolve, reject) => {
      verifier.verify(email, function (err, info) {
        if (err) return resolve(true)
        return resolve(info.success)
      })
    })
  }
}

