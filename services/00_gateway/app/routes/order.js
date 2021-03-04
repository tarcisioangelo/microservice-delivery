const express = require('express')
var router = express.Router()

const httpProxy = require('../services/httpProxy')
const proxy = httpProxy(process.env.HOST_ORDER) 

router.get('/order/*', (req, res, next) => proxy(req, res, next))
router.post('/order/*', (req, res, next) => proxy(req, res, next))
router.put('/order/*', (req, res, next) => proxy(req, res, next))
router.delete('/order/*', (req, res, next) => proxy(req, res, next))

module.exports = router