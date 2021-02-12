require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const express = require('express');
const http = require('http');
const app = express();

const order = [];

app.post('/login', (req, res, next) => {

    console.log();
    return;


    if(req.body.user === 'admin@test.com' && req.body.password === 'G5e2l5d7'){        
        const id = 1; //vem do banco
        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 300 
        });
        return res.json({ auth: true, token: token });
      }
      res.status(500).json({message: 'Login inválido!'});
});

app.get('/order', verifyJWT, (req, res) => {
    return res.json(order);
});

app.get('/order/:index', (req, res) => {
    return res.json('dasas');
});

app.post('/order', (req, res) => {
    const {no_product, id_user, id_product, id_adress, id_payment} = req.body; 
    order.push(no_product, id_user, id_product, id_adress, id_payment);

    return res.json(order);
});

app.put('/order/:index', (req, res) => {
    const { id_product } = req.params;
    return res.json("Altera pedidos");

});

app.delete('/order', (req, res) => {
    return res.json({
        message:'Exclui Pedidos'
    });

});

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}

const server = http.createServer(app);
server.listen(3000);
console.log("Server on-line");