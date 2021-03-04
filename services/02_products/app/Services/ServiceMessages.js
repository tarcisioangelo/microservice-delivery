const amqp = use('amqplib')

const Env = use('Env')
const APP_ID = Env.get('APP_ID')
const AMQP_URL = Env.get('AMQP_URL')

// Messages
const { Delivery } = use('@deliveryLibs/messages')

// Services
const ServiceLocations = require("./ServiceLocations")

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

            // this.emitDelivery()
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

                var waitingTime = 2000;

                location.points.forEach((point, i) => {
                    setTimeout(() => {
                        console.log('Motoboy...', point)
                    }, waitingTime*(i+1))
                })

                resolve()
            } catch (error) {
                console.error(error)
                reject()
            }
        })
    }

}

module.exports = new ServiceMessages()
