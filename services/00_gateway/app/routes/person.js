const express = require('express')
var router = express.Router()

const httpProxy = require('../services/httpProxy')
const proxy = httpProxy(process.env.HOST_PERSON) 

// Middlewares
// ---------------------------------------------------------------------------------------
// const Auth = require('../middlewares/auth')

// Direct Router
// ---------------------------------------------------------------------------------------
router.get('/person/*', (req, res, next) => proxy(req, res, next))
router.post('/person/*', (req, res, next) => proxy(req, res, next))
router.put('/person/*', (req, res, next) => proxy(req, res, next))
router.delete('/person/*', (req, res, next) => proxy(req, res, next))


module.exports = router