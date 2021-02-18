require("dotenv-safe").config()
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const db = require('mysql2')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Todas as rotas tem que ficar nesse padrão
const routes = require('./routes')
app.use(routes)

const conn = db.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: 'order'
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("Conexão realizada com sucesso!");
});

const server = http.createServer(app)

server.listen(4000, () => console.log("Server on-line"))
