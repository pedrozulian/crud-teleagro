const express = require('express');
const router = express.Router();
const publicacoesController = require('../controllers/publicacoes.controller');
const login = require('../middleware/login.moddleware');

router.post('/comentario', publicacoesController.addComentario);

module.exports = router;