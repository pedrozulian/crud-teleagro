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