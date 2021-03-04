class ServerRabbitMQ {

    constructor(url){
        this.url = url;
    }

    connect() {
        return require('amqplib')
          .connect(this.url)
          .then(conn => conn.createChannel());
    }

    createQueue(channel, queue, config = { durable: true }){
        return new Promise((resolve, reject) => {
            try {
                channel.assertQueue(queue, config);
                resolve(channel);
            } catch(err) { 
                reject(err) 
            }
        })
    }
   
    emit(queue, config, message){
        this.connect()
        .then(channel => this.createQueue(channel, queue, config))
        .then(channel => {
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
            channel.close()
        })
        .catch(err => console.log(err))
    }
   
    consumer(queue, config, callback){
        this.connect()
        .then(channel => this.createQueue(channel, queue, config))
        .then(channel => channel.consume(queue, callback, { noAck: true }))
        .catch(err => console.log(err));
    }
}

module.exports = ServerRabbitMQ