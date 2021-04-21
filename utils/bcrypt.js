const apm = require('elastic-apm-node')
const bcrypt = require('bcryptjs')
const defaultSaltRounds = 12;

const salts = {}
salts[defaultSaltRounds] = bcrypt.genSaltSync(defaultSaltRounds)

module.exports = {
  hash: (data, saltRounds = defaultSaltRounds) => {
    const span = apm.startSpan('bcrypt hash')
    const r = bcrypt.hashSync(data, salts[saltRounds])
    if (span) span.end()
    return r
  },
  compare: (data, hash) => {
    const span = apm.startSpan('bcrypt compare')
    const r = bcrypt.compareSync(data.toString(), hash)
    if (span) span.end()
    return r
  }
}
