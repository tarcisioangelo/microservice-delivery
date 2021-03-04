const express = require('express')
var router = express.Router()

const httpProxy = require('../services/httpProxy')
const proxy = httpProxy(process.env.HOST_DELIVERY) 

router.get('/delivery/*', (req, res, next) => proxy(req, res, next))
router.post('/delivery/*', (req, res, next) => proxy(req, res, next))
router.put('/delivery/*', (req, res, next) => proxy(req, res, next))
router.delete('/delivery/*', (req, res, next) => proxy(req, res, next))

module.exports = router