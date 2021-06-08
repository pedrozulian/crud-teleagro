const mysql = require('../config/db.config');

exports.addComentario = async (req, res) => {
    try {
        const query = `
    INSERT INTO comentarios
                (id_publicacao, id_usuario, texto)
         VALUES (?, ?, ?);`;
        await mysql.execute(query, [req.body.id_publicacao, req.body.id_usuario, req.body.texto]);
        return res.status(200).send({ mensagem: 'Comentário adicionado', status: 200 })
        
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.addPostagem = async (req, res) => {
    try {
        const query = `CALL pr_addPublicacao(?, ?, ?, ?);`;
        resultado = await mysql.execute(query, [req.body.id_usuario, req.body.id_tipo_imagem, req.body.url_imagem, req.body.texto]);
        return res.status(200).send({ mensagem: 'Nova publicação adicionada', status: 200 });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.getPostagensUsuario = async (req, res) => {
    try {
        const query = `
             SELECT P.id_publicacao,
                    P.id_usuario,
                    P.texto,
                    U.nome_usuario,
                    I.url,
                    I.id_tipo   AS "id_tipo_imagem"
               FROM publicacoes AS P
         INNER JOIN imagens     AS I
                 ON I.id_imagem = P.id_imagem
         INNER JOIN usuarios    AS U
                 ON U.id_usuario = P.id_usuario
              WHERE P.id_usuario = ?;`;
              resultado = await mysql.execute(query, [req.params.id_usuario]);
              return res.status(200).send(resultado);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}