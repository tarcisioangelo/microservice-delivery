const queue = require('../queue')
const ServiceOrder = require('./ServiceOrder')

class ServiceMessages {

    init() {
        this.consumerOrder()
        this.consumerPayment()
        this.consumerPaymentReturn()
    }

    async consumerOrder() {
        try {
            queue.consume('order', (message) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        if (message.content) {
                            const data = (JSON.parse(message.content.toString()))

                            const id = await ServiceOrder.save(data)
                            const st_order = 'A'

                            resolve(message, true)

                            queue.sendToQueue('payment', { id, st_order })
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
    //só para simular o processamento na payment
    async consumerPayment() {
        try {
            queue.consume('payment', (message) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        if (message.content) {
                            const data = (JSON.parse(message.content.toString()))

                            if (data.st_order === 'P') {

                                const id = ServiceOrder.update(data)

                                resolve(message, id)

                                queue.sendToQueue('payment_return', { id })

                            }

                            resolve(message)
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

                            //Insert na tabela delivery
                            //Disparar Email

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

}
module.exports = new ServiceMessages()
