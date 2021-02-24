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
    //só para simular o processamento na payment
    async consumerPayment() {
        try {
            queue.consume('payment', (message) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        if (message.content) {
                            const data = (JSON.parse(message.content.toString()))

                            // Processei todo o pagamento e gerou um ID
                            const id_payment = 123456

                            const dataPayment = {
                                id_order: data.id,
                                id_payment
                            }

                            resolve(message)

                            queue.sendToQueue('payment_return', dataPayment)

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
