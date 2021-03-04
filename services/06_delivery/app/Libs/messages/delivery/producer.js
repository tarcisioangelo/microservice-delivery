const config = require('./config')

const emit = (channel, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!channel) {
                reject('Desconnected')
            }

            channel.assertQueue(`delivery`, config)  
            channel.sendToQueue(`delivery`, Buffer.from(JSON.stringify(message)))

            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { emit }

