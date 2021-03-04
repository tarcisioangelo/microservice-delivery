const express = require('express')
var router = express.Router()

const httpProxy = require('../services/httpProxy')
const proxy = httpProxy(process.env.HOST_PAYMENT) 

router.get('/payment/*', (req, res, next) => proxy(req, res, next))
router.post('/payment/*', (req, res, next) => proxy(req, res, next))
router.put('/payment/*', (req, res, next) => proxy(req, res, next))
router.delete('/payment/*', (req, res, next) => proxy(req, res, next))

module.exports = router