const express = require('express')
const cors = require('cors')
const Youch = require('youch')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

class App {
    constructor () {
        this.express = express()
        this.isDev = process.env.NODE_ENV !== 'production'

        this.middlewares()
        this.routes()
        this.exception()
    }

    middlewares () {
        this.express.use(express.urlencoded({ extended: false }))
        this.express.use(cookieParser())
        this.express.use(express.json())
        this.express.use(helmet())
        this.express.use(cors())
    }

    routes () {
        this.express.use(require('./routes'))
    }

    exception () {
        this.express.use(async (err, req, res, next) => {
            if (this.isDev) {
                const youch = new Youch(err, req)
                return res.json(await youch.toJSON())
            }

            return res.status(err.status || 500).json({ error: { message: 'Internal Server Error' } })
        })
    }
}

module.exports = new App().express
