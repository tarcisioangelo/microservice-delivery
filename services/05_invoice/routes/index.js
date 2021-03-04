const express = require('express')
const routes = express.Router()
const queue = require('../rabbitmq')
const EmptyToNull = require('../middlewares/EmptyToNull')

// Middleware Geral
routes.use(EmptyToNull)

routes.post('/email', (req, res) => {
    queue.sendToQueue("email", req.body)
    res.json({ message: 'e-mail enviado' })
})
module.exports = routes