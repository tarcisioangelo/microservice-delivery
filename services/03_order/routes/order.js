const express = require('express')
var router = express.Router()

// Controllers
const OrderController = require('../controllers/OrderController')

router.get('/order/list', OrderController.list)

module.exports = router