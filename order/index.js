require("dotenv-safe").config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const ServiceMessages = require('./services/ServiceMessages')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Todas as rotas tem que ficar nesse padrão
const routes = require('./routes')

app.use(routes)

ServiceMessages.init()

app.listen(4000, () => console.log("Server on-line"))