const express = require('express');
const router = express.Router();
const publicacoesController = require('../controllers/publicacoes.controller');
const login = require('../middleware/login.moddleware');

router.get('/:id_usuario', publicacoesController.getPostagensUsuario);

router.post('/', publicacoesController.addPostagem);
router.post('/comentario', publicacoesController.addComentario);

module.exports = router;