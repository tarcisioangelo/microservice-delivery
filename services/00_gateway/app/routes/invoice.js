const express = require('express')
var router = express.Router()

const httpProxy = require('../services/httpProxy')
const proxy = httpProxy(process.env.HOST_INVOICE) 

router.get('/invoice/*', (req, res, next) => proxy(req, res, next))
router.post('/invoice/*', (req, res, next) => proxy(req, res, next))
router.put('/invoice/*', (req, res, next) => proxy(req, res, next))
router.delete('/invoice/*', (req, res, next) => proxy(req, res, next))

module.exports = router