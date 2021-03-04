const queue = require('../rabbitmq')
const ServiceEmail = require('./ServiceEmail')

class ServiceMessages {

    constructor() {
        this.init()
    }

    init() {
        this.consumerEmail()
    }

    async consumerEmail() {
        try {
            queue.consume('email', (message) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        if (message.content) {
                            const data = (JSON.parse(message.content.toString()))

                            data.st_order = 'A'

                            const id = await ServiceEmail.send(data)

                            data.id = id

                            resolve(message, true)

                            queue.sendToQueue('payment', data)
                        }
                    } catch (error) {
                        reject(message)
                        console.error('Consumer.error', error.message)
                    }
                })
            })

        } catch (error) {
            console.error(error)
        }
    }

    async emitLog(message) {
        try {
            queue.sendToQueue('logs', message)
        } catch (error) {
            console.error(error)
        }
    }

}
module.exports = new ServiceMessages()
