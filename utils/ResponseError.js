/* eslint-disable space-before-function-paren */
class ResponseError extends Error {
  constructor(message, status = 400, code = '0000', description = '') {
    super(message)

    this.name = this.constructor.name

    this.message = message
    this.status = status
    this.code = code
    this.description = description

  }

  toJson() {
    return {
      message: this.message,
      status: this.status,
      code: this.code,
      description: this.description
    }
  }
}

module.exports = ResponseError
