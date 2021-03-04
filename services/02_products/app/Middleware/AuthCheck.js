'use strict'

const jwt = require('jsonwebtoken')
const { promisify } = require('util')

class Auth {
    // For HTTP
    async handle({ request }, next) {
        try {
            const headers = request.headers()

            request.userID = parseInt(headers.authorized) || 0

            await next()
        } catch (error) {
            await next()
        }
    }

    // For WebSocket
    async wsHandle({ request }, next) {
        try {
            const { token } = request.all()

            const decoded = await promisify(jwt.verify)(token, process.env.AUTH_KEY)
            
            request.userID = parseInt(decoded.uid)

            await next()
        } catch (error) {
            console.log(error.message)
            await next()
        }
    }
  }
  
module.exports = Auth

