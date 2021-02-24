const ServiceMessages = require("./ServiceMessages")

class ServiceLog {

    async error(msg, controller = '', action = '') {
        try {
            const message = {
                type: 'error',
                service: process.env.SERVICE,
                controller,
                action,
                msg
            }

            // Envia para a fila logs
            await ServiceMessages.emitLog(message)

        } catch (error) {
            console.error(error)
        }
    }

    async info(msg, controller = '', action = '') {
        try {
            const message = {
                type: 'error',
                service: process.env.SERVICE,
                controller,
                action,
                msg
            }

            // Envia para a fila logs
            await ServiceMessages.emitLog(message)

        } catch (error) {
            console.error(error)
        }
    }

    async warning(msg, controller = '', action = '') {
        try {
            const message = {
                type: 'warning',
                service: process.env.SERVICE,
                controller,
                action,
                msg
            }

            // Envia para a fila logs
            await ServiceMessages.emitLog(message)

        } catch (error) {
            console.error(error)
        }

    }
}

module.exports = new ServiceLog()