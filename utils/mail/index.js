const Vue = require('vue')
const path = require('path')
const fs = require('fs')
const nodemailer = require('nodemailer')
const CONF = require('../../config')
const apm = require('elastic-apm-node')
const log = require('../../utils/log')

if (CONF.NODE_ENV === 'test') {
  Vue.config.productionTip = false
  Vue.config.devtools = false
}

const mailer = nodemailer.createTransport(
  {
    host: CONF.SMTP.HOST,
    port: CONF.SMTP.PORT,
    secure: CONF.SMTP.SECURE,
    auth: {
      user: CONF.SMTP.USER,
      pass: CONF.SMTP.PASS
    }
  }, {
  from: CONF.SMTP.FROM || CONF.SMTP.USER,
  tls: { rejectUnauthorized: false },
  logger: true,
  debug: true
}
)

const subjects = {
  th: {
    forgotpassword: 'เปลี่ยนรหัสผ่าน'
  }
}

const defaultData = {
  forgotpassword: {
    expire: CONF.FORGOT_PASSWORD_EXPIRE
  }
}

async function sendMailWithTemplate(name, to, data = {}, language = 'th') {
  const subject = subjects[language][name]
  data = Object.assign(defaultData[name], data)

  try {
    const span = apm.startSpan('sendMailWithTemplate')
    const app = new Vue({
      template: fs.readFileSync(path.resolve(__dirname, 'template', language, name + '.html'), 'utf8'),
      data
    })

    const renderer = require('vue-server-renderer').createRenderer()
    var html = await renderer.renderToString(app)

    if (process.env.NODE_EN != 'production') {
      console.log({
        to, subject, data, html
      })
    } else {
      await mailer.sendMail({
        to,
        subject,
        html,
      })
    }

    if (span) span.end()
  } catch (err) {
    console.warn(err)
  }
}

module.exports = {
  sendMailWithTemplate,
  mailer
}