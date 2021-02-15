require("dotenv-safe").config()
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Todas as rotas tem que ficar nesse padrão
const routes = require('./routes')
app.use(routes)


// Muda o resto ai




// Middlewares
const verifyJWT = require('./middlewares/auth')

app.get('/order', verifyJWT, (req, res) => {
    const { userID } = req

    const orders = []

    console.log('ID do usuário que veio do token: ', userID)
    
    return res.json({ orders })
})

app.get('/order/:index', (req, res) => {
    return res.json('dasas')
})

app.post('/order', (req, res) => {
    const { no_product, id_user, id_product, id_adress, id_payment } = req.body

    const orders = []

    orders.push(no_product, id_user, id_product, id_adress, id_payment)

    return res.json({ orders })
})

app.put('/order/:index', (req, res) => {
    const { id_product } = req.params
    return res.json("Altera pedidos")

})

app.delete('/order', (req, res) => {
    return res.json({
        message: 'Exclui Pedidos'
    })
})


const server = http.createServer(app)

server.listen(4000, () => console.log("Server on-line"))
