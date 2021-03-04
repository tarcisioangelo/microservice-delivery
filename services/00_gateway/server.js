require('dotenv').config()

const server = require('./app')

const port = process.env.PORT || 4000
const host = process.env.HOST || '0.0.0.0'

server.listen(port, host, () => console.log(`Server inicialized in port ${port}`))

