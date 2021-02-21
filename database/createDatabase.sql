CREATE DATABASE teleagro;

USE teleagro;

CREATE TABLE usuarios (
    id_usuario INT NOT NULL AUTO_INCREMENT,
    nome_usuario VARCHAR(50) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    cidade VARCHAR(50),
    uf VARCHAR(2),
    senha LONGTEXT NOT NULL,
    PRIMARY KEY (id_usuario)
);
