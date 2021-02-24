const ServiceLog = require("./ServiceLog")

class ServicePayment {

    async processPayment(id_order) {
        try {
            const id_payment = Math.floor(Math.random() * 1000)

            const data = {
                id_order,
                id_payment
            }

            return data

        } catch (error) {
            console.error(error.message)
            ServiceLog.error(error.message, 'ServicePayment', 'processPayment')
            throw error
        }
    }

}

module.exports = new ServicePayment()