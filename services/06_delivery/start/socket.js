'use strict'

const Ws = use('Ws')

Ws.channel('admin:*', 'WsDeliveryController')

