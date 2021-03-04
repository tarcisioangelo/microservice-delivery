const express = require('express')
const routes = express.Router()
const EmptyToNull = require('../middlewares/EmptyToNull')

// Middleware Geral
routes.use(EmptyToNull)

module.exports = routes