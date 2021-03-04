'use strict'

class DateTime {

    async handle({ request }, next) {

        const date_now = parseInt(new Date().getTime() / 1000)

        request.date_now = date_now

        await next()
    }

    async wsHandle({ request }, next) {

        const date_now = parseInt(new Date().getTime() / 1000)

        request.date_now = date_now

        await next()
    }

}

module.exports = DateTime

