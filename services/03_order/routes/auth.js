const express = require('express')
var router = express.Router()

// Controllers
const AuthController = require('../controllers/AuthController')

router.post('/login', AuthController.login)

module.exports = router