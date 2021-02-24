const express = require('express')
const routes = express.Router()
const queue = require('../queue')
const EmptyToNull = require('../middlewares/EmptyToNull')

// Routers
const routerAuth = require('./auth')
const routerOrder = require('./order')

// Middleware Geral
routes.use(EmptyToNull)

routes.use(routerAuth)
routes.use(routerOrder)


routes.post('/task', (req, res) => {
    queue.sendToQueue("order", req.body)
    res.json({ message: 'Sua reqiusição será processada' })
})



module.exports = routes