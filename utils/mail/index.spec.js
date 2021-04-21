const { mailer, sendMailWithTemplate } = require('../mail')

describe('utils', () => {
  describe('mail', () => {
    it('should send mail with template', async done => {
      mailer.sendMail = jest.fn()
      await sendMailWithTemplate('vertifyOtp', 'user@mail.com', 'รีเซ็ตรหัสผ่าน',
        {
          username: 'ชื่อ',
          vertifyOtp: '123456',
          origin: 'https://[::1]'
        }
      )

      expect(mailer.sendMail).toMatchSnapshot()
    })
  })
})