'use strict'

const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = {
    async handle({ request, response }, next) {
        try {
            const { authorization } = request.headers()
            
            if (!authorization) {
                throw new Error('Não autorizado')
            }
            
            const [, token] = authorization.split(' ')
            
            const decoded = await promisify(jwt.verify)(token, process.env.AUTH_KEY)
            
            let userID = parseInt(decoded.uid)
            
            request.userID = parseInt(userID)
            
            if(!userID) {
                throw new Error('Não autorizado')
            }

            await next()
        } catch (error) {
            console.log(error.message)
            return response.status(401).json({ error: { message: 'Não autorizado' } })
        }
    }
}
