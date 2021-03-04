const queue = require('../rabbitmq')
const ServiceOrder = require('./ServiceOrder')

class ServiceMessages {

    constructor(){
        this.init()
    }
    
    init() {
        this.consumerOrder()
        this.consumerPaymentReturn()
    }

    async consumerOrder() {
        try {
            queue.consume('order', (message) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        if (message.content) {
                            const data = (JSON.parse(message.content.toString()))

                            data.st_order = 'A'

                            const id = await ServiceOrder.save(data)
                            
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

    async consumerPaymentReturn() {
        try {
            queue.consume('payment_return', (message) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        if (message.content) {
                            const data = (JSON.parse(message.content.toString()))

                            if (data.id_payment) {

                                await ServiceOrder.updateStatus(data.id_order, 'P')

                                //Insert na tabela delivery
                                //Disparar Email
                            }

                            resolve(message, data)
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
