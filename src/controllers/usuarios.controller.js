const mysql = require('../config/db.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUsuarios = async (req, res) => {
    try {
        const query = `SELECT nome_usuario,
                              nome,
                              email,
                              cidade,
                              uf
                         FROM usuarios`;
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
        return res.status(200).send({
            error: false,
            mensagem: 'Usuário criado com sucesso!',
            email: req.body.email,
            status: 200
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(406).send({ 
                error: true,
                mensagem: 'E-mail e/ou Nome Usuário já cadastrado',
                status: 406
            });
        }
        return res.status(500).send({
            error: true,
            mensagem: 'Ocorreu um problema! Veja se os dados estão corretos.',
            status: 500
        });
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

exports.deletarUsuario = async (req, res) => {
    try {
        if (parseInt(req.params.id_usuario) !== res.locals.id_usuario) {
            return res.status(401).send({ mensagem: 'Sem permissão para deletar usuário.' });
        }
        const query = `DELETE FROM usuarios
                             WHERE id_usuario = ?`;
        await mysql.execute(query, [req.params.id_usuario]);
        return res.status(200).send({ mensagem: 'Usuário deletado com sucesso.' });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.perfil = async (req, res) => {
    try {
        const query = `
                SELECT U.nome_usuario,
                U.nome,
                U.email,
                U.cidade,
                U.uf,
                P.id_imagem,
                I.url
           FROM usuarios U
        LEFT JOIN publicacoes P
             ON P.id_usuario = U.id_usuario
        LEFT JOIN imagens I
             ON I.id_tipo = 1
          WHERE U.id_usuario = ?;`
        
        const resultado = await mysql.execute(query, [req.params.id_usuario]);
        return res.status(200).send(resultado);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}