const express = require('express')
const routes = express.Router()

const EmptyToNull = require('../middlewares/EmptyToNull')

// Admin
routes.get('/gateway/admin', (req, res, next) => {
    res.send({ message: 'Gateway running' })
})

// Routers
const routerPerson = require('./person')
const routerProducts = require('./products')
const routerOrder = require('./order')
const routerPayment = require('./payment')
const routerInvoice = require('./invoice')
const routerDelivery = require('./delivery')

routes.use(EmptyToNull)

routes.use(routerPerson)
routes.use(routerProducts)
routes.use(routerOrder)
routes.use(routerPayment)
routes.use(routerInvoice)
routes.use(routerDelivery)

module.exports = routes
