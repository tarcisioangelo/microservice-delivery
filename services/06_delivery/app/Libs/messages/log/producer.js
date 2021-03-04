const config = require('./config')

const emit = (channel, logData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!channel) {
                reject('Desconnected')
            }
            
            const fila = 'log'
    
            channel.assertQueue(fila, config)  
            channel.sendToQueue(fila, Buffer.from(JSON.stringify(logData)))
            
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { emit }
