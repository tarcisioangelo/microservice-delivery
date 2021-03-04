'use strict'

const Route = use('Route')

Route.get('/', () => { message: 'API Delivery' })

// Admin
Route.get('products', 'ProductsController.index')
Route.get('products/list', 'ProductsController.index')
