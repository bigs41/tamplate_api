const express = require('express')
const router = express.Router({ mergeParams: true })
const ResponseError = require('../utils/ResponseError')
const help = require('../utils/helpers')
const moment = require('moment')
const axios = require('axios')
router.all('/', async function (req, res, next) {
    try {
        return res.json({})
    } catch (error) {
        next(error);
    }
})

module.exports = router