const mysql = require('../config/db.config');

exports.getUsuarios = async (req, res) => {
    try {
        const query = `SELECT * FROM usuarios`;
        const resultado = await mysql.execute(query);
        return res.status(200).send({ usuarios: resultado });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.criarUsuario = async (req, res) => {
    try {
        const query = `INSERT INTO usuarios
                                   (nome_usuario, nome, email, cidade, uf, senha)
                            VALUES (?, ?, ?, ?, ?, ?)`;
        const resultado = await mysql.execute(query, [
            req.body.nome_usuario,
            req.body.nome,
            req.body.email,
            req.body.cidade,
            req.body.uf,
            req.body.senha
        ]);
        return res.status(200).send({ resultado: 'Usuário criado!' });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};