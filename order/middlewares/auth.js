
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const verifyJWT = async (req, res, next) => {
    try {
        const { authorization } = req.headers
            
        if (!authorization) {
            throw new Error('Não autorizado')
        }
        
        const [, token] = authorization.split(' ')
        
        
        const decoded = await promisify(jwt.verify)(token, process.env.SECRET)
        
        const userID = parseInt(decoded.id)
            
        if(!userID) {
            throw new Error('Não autorizado')
        }

        req.userID = parseInt(userID)

        await next()

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ auth: false, message: 'Falha na autenticação.' });
    }
}

module.exports = verifyJWT