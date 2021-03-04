const queue = require('../rabbitmq')
const ServicePayment = require('./ServicePayment')

class ServiceMessages {

    constructor(){
        this.init()
    }
    
    init() {
        this.consumerPayment()
    }

    async consumerPayment() {
        try {
            queue.consume('payment', (message) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        if (message.content) {
                            const data = (JSON.parse(message.content.toString()))

                            const dataPayment = await ServicePayment.processPayment(data.id)

                            resolve(message)

                            queue.sendToQueue('payment_return', dataPayment)

                            resolve(message)
                        }
                    } catch (error) {
                        console.error('consumerPayment', error.message)
                        reject(message)
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
