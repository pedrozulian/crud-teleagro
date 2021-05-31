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

CREATE TABLE IF NOT EXISTS `tipos_imagens` (
    id_tipo INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    PRIMARY KEY (id_tipo)
);

INSERT IGNORE INTO `tipos_imagens` (nome) VALUES
    ('Perfil'),
    ('Publicação');

CREATE TABLE IF NOT EXISTS `imagens` (
    id_imagem INT NOT NULL AUTO_INCREMENT,
    id_tipo INT NOT NULL,
    url LONGTEXT NOT NULL,
    PRIMARY KEY (id_imagem),
    FOREIGN KEY (id_tipo) REFERENCES tipos_imagens (id_tipo)
);

CREATE TABLE IF NOT EXISTS `publicacoes` (
    id_publicacao INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_imagem INT,
    texto LONGTEXT,
    PRIMARY KEY (id_publicacao),
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
    FOREIGN KEY (id_imagem)  REFERENCES imagens (id_imagem)
);

CREATE TABLE IF NOT EXISTS `comentarios` (
    id_comentario INT NOT NULL AUTO_INCREMENT,
    id_publicacao INT NOT NULL,
    id_usuario INT NOT NULL,
    texto LONGTEXT,
    PRIMARY KEY (id_comentario),
    FOREIGN KEY (id_publicacao) REFERENCES publicacoes (id_publicacao),
    FOREIGN KEY (id_usuario)  REFERENCES usuarios (id_usuario)
);

DROP PROCEDURE IF EXISTS `pr_addPublicacao`;
CREATE PROCEDURE pr_addPublicacao (

   IN _id_usuario     INT,
   IN _id_tipo_imagem INT,
   IN _url_imagem     LONGTEXT,
   IN _texto          LONGTEXT
   )
BEGIN

    INSERT INTO imagens (
       id_tipo,
       url
     ) VALUES (
       _id_tipo_imagem,
       _url_imagem
     );

    SET @id_imagem = LAST_INSERT_ID();

    INSERT INTO publicacoes (
        id_usuario,
        id_imagem,
        texto
    ) VALUES (
        _id_usuario,
        @id_imagem,
        _texto
    );
END;