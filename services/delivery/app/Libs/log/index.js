const Env = use('Env')
const APP_ID = Env.get('APP_ID')

class Logger {
    
    info (controller, method, message){
        try {
            const ServiceMessages = use("App/Services/ServiceMessages")
            ServiceMessages.emitLog({ type: 'info', service: APP_ID, controller, method, message })
        } catch (error) {
            console.log(error.message)            
        }
    }
    
    warn (controller, method, message) {
        try {
            const ServiceMessages = use("App/Services/ServiceMessages")
            ServiceMessages.emitLog({ type: 'warn', service: APP_ID, controller, method, message })
        } catch (error) {
            console.log(error.message)            
        }
    }
    
    error (controller, method, message) {
        try {
            console.error(message)
            const ServiceMessages = use("App/Services/ServiceMessages")
            ServiceMessages.emitLog({ type: 'error', service: APP_ID, controller, method, message })
        } catch (error) {
            console.log(error.message)            
        }
    }
    
    errorDB (controller, method, message, sql) {
        try {
            console.error(message)
            const ServiceMessages = use("App/Services/ServiceMessages")
            ServiceMessages.emitLog({ type: 'error-db', service: APP_ID, controller, method, message, sql })
        } catch (error) {
            console.log(error.message)            
        }
    }
}

module.exports = new Logger()
