'use strict'

class WsDeliveryController {

    constructor({ socket, request }) {
        this.socket = socket
        this.request = request
        this.dateNow = request.date_now
    }

    async register() {
        const topic = Ws.getChannel('admin:*').topic('admin:services')

        if (topic) {
            // topic.broadcast('admin:services')
        }
    }

    async onMessage(message) {
        message.topic = this.socket.topic
        message.created = this.dateNow

        console.log('onMessage', message)
      // this.socket.broadcastToAll('message', message)
    }

}

module.exports = WsDeliveryController

/**
 * -- Docs
 *
 * Emit event to the connected client:
 * socket.emit('id', socket.id)
 *
 * Emit event to an array of socket ids:
 * socket.emitTo('greeting', 'hello', [someIds])
 *
 * Emit event to everyone except yourself:
 * socket.broadcast('message', 'hello everyone!')
 *
 * Emit event to everyone including yourself:
 * socket.broadcastToAll('message', 'hello everyone!')
 *
 */
