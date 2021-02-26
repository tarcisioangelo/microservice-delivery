const config = require('./config')

const emitExtract = (channel, assetData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!channel) {
                reject('Desconnected')
            }
            
            channel.assertQueue(`news-extract`, config)  
            channel.sendToQueue(`news-extract`, Buffer.from(JSON.stringify(assetData)))
            
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

const emitNews = (channel, assetData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!channel) {
                reject('Desconnected')
            }

            channel.assertQueue(`news`, config)  
            channel.sendToQueue(`news`, Buffer.from(JSON.stringify(assetData)))
            
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { emitExtract, emitNews }

