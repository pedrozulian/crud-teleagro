'use strict';
const { query } = require('express');
const mysql = require('../../config/db.config');

exports.getUsuarios = async (req, res) => {
    try {
        const query = `SELECT * FROM usuarios`;
        const resultado = await mysql.execute(query);
        return res.status(200).send({ usuarios: resultado });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};