const express = require('express')
const routes = express.Router()
const EmptyToNull = require('../middlewares/EmptyToNull')

// Routers
const routerAuth = require('./auth')
const routerOrder = require('./order')

// Middleware Geral
routes.use(EmptyToNull)

routes.use(routerAuth)
routes.use(routerOrder)

module.exports = routes