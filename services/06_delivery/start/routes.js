'use strict'

const Route = use('Route')

Route.get('/', () => { message: 'API Delivery' })

// Admin
Route.get('admin', 'DeliveryController.index')