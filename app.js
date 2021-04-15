const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Root end-point - CRUD TeleAgro');
});

// Rotas de Usuários
const usuariosRoute = require('./src/routes/usuarios.routes');
app.use('/usuarios', usuariosRoute);

module.exports = app;