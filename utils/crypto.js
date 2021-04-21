
const crypto = require('crypto')
const algorithm = 'aes-256-cbc'
const iv = '0000000000000000'

module.exports = {
  encrypt(text, key) {
    const shasum = crypto.createHash('sha1')
    shasum.update(key)
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(shasum.digest('hex').substring(0, 32)), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('base64')
  },
  decrypt(encrypted, key) {
    const shasum = crypto.createHash('sha1')
    shasum.update(key)
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(shasum.digest('hex').substring(0, 32)), iv)
    let decrypted = decipher.update(Buffer.from(encrypted, 'base64'))
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
  }
}
