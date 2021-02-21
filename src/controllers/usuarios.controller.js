const mysql = require('../config/db.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        const hash = bcrypt.hashSync(req.body.senha, 10);
        const query = `INSERT INTO usuarios
                                   (nome_usuario, nome, email, cidade, uf, senha)
                            VALUES (?, ?, ?, ?, ?, ?)`;
        const resultado = await mysql.execute(query, [
            req.body.nome_usuario,
            req.body.nome ? req.body.nome : req.body.nome_usuario,
            req.body.email,
            req.body.cidade,
            req.body.uf,
            hash
        ]);
        return res.status(200).send({ resultado: 'Usuário criado!' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(406).send({ error: 'E-mail e/ou Nome Usuário já cadastrado' });
        }
        return res.status(500).send({ error: error });
    }
};

exports.login = async (req, res) => {
    try {
        const query = `SELECT id_usuario,
                              nome_usuario,
                              nome,
                              email,
                              senha
                         FROM usuarios
                        WHERE email = ?`;
        const resultado = await mysql.execute(query, [req.body.email]);
        if (resultado.length) {
            if (bcrypt.compareSync(req.body.senha, resultado[0].senha)) {
                const token = jwt.sign({
                    email: resultado[0].email,
                    nome: resultado[0].nome,
                    id_usuario: resultado[0].id_usuario
                }, 'add-to-encrypt', {});

            return res.status(200).send({
                    mensagem: 'Usuário autenticado com sucesso!',
                    id_usuario: resultado[0].id_usuario,
                    token: token,
                    nome: resultado[0].nome
                });
            };
        };
        return res.status(401).send({ mensagem: 'Falha na autenticação' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
};