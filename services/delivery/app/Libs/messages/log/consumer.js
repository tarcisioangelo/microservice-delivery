const config = require('./config')

const consumer = (channel, cb) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!channel) {
                reject('Desconnected')
            }
            
            const fila = 'log'
            
            channel.assertQueue(fila, config)
            channel.prefetch(1)
            channel.consume(fila, (msg) => {
                try {
                    if (msg.content) {
                        const message = (JSON.parse(msg.content.toString()))
                        cb(message)
                        channel.ack(msg)
                    } else {
                        channel.reject(msg, true)
                    }
                } catch (e) {
                    reject(e)
                }
            }, { noAck: false })
        
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { consumer }


