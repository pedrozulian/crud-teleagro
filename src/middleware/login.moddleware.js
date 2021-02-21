const jwt = require('jsonwebtoken');
const mysql = require('../config/db.config');

exports.required = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'add-to-encrypt');
        req.userData = decoded;
        res.locals.id_usuario = req.userData.id_usuario;
        next();
    } catch (error) {
        return res.status(401).send({ mensagem: 'Usuário não autenticado.' });
    }
};