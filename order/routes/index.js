const express = require('express')
const routes = express.Router()

const EmptyToNull = require('../middlewares/EmptyToNull')

// Routers
const routerAuth = require('./auth')

// Middleware Geral
routes.use(EmptyToNull)

routes.use(routerAuth)

module.exports = routes