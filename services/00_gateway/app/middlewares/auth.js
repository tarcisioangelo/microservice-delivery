const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
    
        if (!authHeader) {
            return res.status(401).json({ error: { message: 'Token not provided' } })
        }
    
        const [, token] = authHeader.split(' ')

        const decoded = await promisify(jwt.verify)(token, process.env.AUTH_KEY)

        req.headers.authorized = decoded.uid

        /**
         * Vamos colocar o keyApp aqui
         * 
         * Cada Serviço tem seu idToken onde aqui depois que passar o principal ele 
         * deve colocar no Header como authorized-service
         * 
         * Os MS deve ter um mínimo de autenticação
         */


        await next()
    } catch (error) {
        console.error(error.message)
        if(error.message === 'invalid signature') {
            return res.status(401).json({ error: { message: 'Token invalid'} })
        }
        return res.status(401).json({ error: { message: 'Token invalid' } })
    }
}
