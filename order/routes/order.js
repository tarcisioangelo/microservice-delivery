const express = require('express')
var router = express.Router()

// Controllers
const OrderController = require('../controllers/OrderController')

router.get('/list', OrderController.list)
router.post('/insert', OrderController.insert)


module.exports = router