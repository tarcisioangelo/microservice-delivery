const ServiceLocations = require("./ServiceLocations")

const amqp = use('amqplib')

const Env = use('Env')
const APP_ID = Env.get('APP_ID')
const AMQP_URL = Env.get('AMQP_URL')

const Ws = use('Ws')

// Messages
const { Delivery } = use('@autoclubesLibs/messages')

// Services
const ServiceUser = use('App/Services/ServiceUser')

class ServiceMessages {

    constructor() {
        this.interval = null
        this.conn = null
        this.channel = null
        this.init()
    }

    async init() {
        try {
            await this.getChannel()
            console.log('AMQP Connected')

            // Log.consumer(this.channel, this.consumerLog)
            this.emitDelivery()
            Delivery.consumer(this.channel, this.consumerDelivery)

        } catch (error) {
            console.error('AMQP Desconected', error?.message)
            this.reconnect()
        }
    }

    /**
     * Caso dê erro na conexão
     * Fica tentando de 5 em 5 segundos
     */
    reconnect() {
        setTimeout(() => this.init(), 5000)
    }

    async getChannel() {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.conn) {
                    this.conn = await amqp.connect(AMQP_URL, { clientProperties: { connection_name: APP_ID }});
                }

                if (!this.channel) {
                    this.channel = await this.conn.createChannel()
                }

                resolve()
            } catch (error) {
                reject()
            }
        })
    }

    async emitDelivery() {
        try {
            await this.getChannel()

            const data = {
                address: 'A',
                order: 1
            }
            await Delivery.emit(this.channel, data)
        } catch (error) {
            console.error(error)
        }
    }


    async consumerDelivery(message) {
        return new Promise(async (resolve, reject) => {
            try {
                const { address } = message

                const location = await ServiceLocations.getLocation(address)

                console.log(`Enviando para ${location.address}`)

                // location.points.map(point => {
                //     setTimeout(() => {
                //         console.log(point)
                //     }, 1000)
                // })

                resolve()
            } catch (error) {
                console.error(error)
                reject()
            }
        })
    }

    async sendMessageWS(point) {
        try {

            setTimeout(() => {
                console.log(point)
            }, 1000)

            // const channel = Ws.getChannel('admin:*').topic(`admin:${topic}`)

            // if (channel) {
            //     channel.broadcastToAll('message', data)
            // }
        } catch (error) {
            console.error(error.message)
        }
    }

}

module.exports = new ServiceMessages()
