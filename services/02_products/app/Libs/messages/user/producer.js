const config = require('./config')

/**
 * Esse cara tem que ser consumido de algum lugar
 */
const services = ["event", "shop", "garage", "videos", "trip", "chat", "news", "project"]

const emit = (channel, userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!channel) {
                reject('Desconnected')
            }

            services.forEach(fila => {
                channel.assertQueue(`user-${fila}`, config)  
                channel.sendToQueue(`user-${fila}`, Buffer.from(JSON.stringify(userData)))
            })

            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { emit }
