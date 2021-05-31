const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const login = require('../middleware/login.moddleware');

router.post('/cadastro', usuariosController.criarUsuario);
router.post('/login', usuariosController.login);

router.get('/', login.required, usuariosController.getUsuarios);
router.get('/perfil/:id_usuario', login.required, usuariosController.perfil);

router.delete('/deletar/:id_usuario', login.required, usuariosController.deletarUsuario);
module.exports = router;