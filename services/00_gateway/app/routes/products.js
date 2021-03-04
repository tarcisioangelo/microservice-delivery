const express = require('express')
var router = express.Router()

const httpProxy = require('../services/httpProxy')
const proxy = httpProxy(process.env.HOST_PRODUCTS) 

router.get('/products/*', (req, res, next) => proxy(req, res, next))
router.post('/products/*', (req, res, next) => proxy(req, res, next))
router.put('/products/*', (req, res, next) => proxy(req, res, next))
router.delete('/products/*', (req, res, next) => proxy(req, res, next))

module.exports = router