const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

router.get('/', usuariosController.getUsuarios);
router.post('/cadastro', usuariosController.criarUsuario);
router.post('/login', usuariosController.login);

module.exports = router;