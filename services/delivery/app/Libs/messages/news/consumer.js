const config = require('./config')

/**
 * rssId
 * title 
 * description
 * slug
 * cover 
 * author 
 * publisher
 * publication
 * link
 */
const consumerExtract = (channel, cb) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!channel) {
                reject('Desconnected')
            }
    
            const fila = `news-extract`
    
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

const consumerNews = (channel, cb) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!channel) {
                reject('Desconnected')
            }
    
            const fila = `news`
    
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

module.exports = { consumerExtract, consumerNews }

