require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const db = require('./db');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const order = [];

app.post('/login', (req, res, next) => {
    if (req.body.user === 'admin@test.com' && req.body.password === 'G5e2l5d7#') {
        const id = 1; //vem do banco
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 30000
        });
        return res.status(200).json({ auth: true, token: token });
    }
    res.status(500).json({ message: 'Login inválido!' });
});

app.get('/order', verifyJWT, (req, res) => {
    return res.json(order);
});

app.get('/order/:index', (req, res) => {
    return res.json('dasas');
});

app.post('/order', (req, res) => {
    const { no_product, id_user, id_product, id_adress, id_payment } = req.body;
    order.push(no_product, id_user, id_product, id_adress, id_payment);

    return res.json(order);
});

app.put('/order/:index', (req, res) => {
    const { id_product } = req.params;
    return res.json("Altera pedidos");

});

app.delete('/order', (req, res) => {
    return res.json({
        message: 'Exclui Pedidos'
    });

});

function verifyJWT(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Falha na autenticação.' });
        req.userId = decoded.id;
        next();
    });
}

const server = http.createServer(app);
server.listen(3000);
console.log("Server on-line");