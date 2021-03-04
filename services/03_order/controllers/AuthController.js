const jwt = require('jsonwebtoken');
const ServiceLog = require('../services/ServiceLog');

class AuthController {

    async login(req, res) {
        try {
            const { user, password } = req.body

            if (user === 'admin@test.com' && password === 'G5e2l5d7#') {

                const id = 1; //vem do banco

                const token = jwt.sign({ id }, process.env.SECRET, {
                    // expiresIn: 30000
                });

                return res.status(200).json({ auth: true, token: token });
            }

            res.status(500).json({ message: 'Login inválido!' });

        } catch (error) {
            console.error(error.message)
            ServiceLog.error(error?.message, 'AuthController', 'login')
        }
    }

}

module.exports = new AuthController()