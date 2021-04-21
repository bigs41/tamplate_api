const express = require('express')
const router = express.Router({ mergeParams: true })
const ResponseError = require('../utils/ResponseError')
const help = require('../utils/helpers')

router.all('/', async function (req, res, next) {
  try {
    res.send('OK')
  } catch (e) {
    next(e)
  }
})

module.exports = router
