# CRUD TeleAgro
Repositório do CRUD do projeto TeleAgro, da disciplina Projeto Integrador 6, curso de Big Data no Agronegócio, da FATEC Pompéia "Shunji Nishimura".

## Pré-requisitos
O que precisamos para rodar o projeto?
* Node.js + NPM
* MySQL
* IDE (VSCode, Sublime, etc)

### Clonando o projeto
Abra o terminal na pasta onde deseja clonar o projeto, e rode o seguinte comando:
````
git clone git@github.com:pedrozulian/crud-teleagro.git
````

### Instalando pacotes
Dentro da repositório, insira o comando abaixo para instalar todos os pacotes utilizados com o Node Package Manager (NPM):
````
npm install --save 
````

## Banco de Dados MySQL
Agora, criaremos o nosso banco de dados e as tabelas em sua máquina local.<br>
Com o MySQL instalado, abra o terminal para conectar-se com o banco de dados.<br>
Localmente, teremos as seguintes credencias:
````
host: localhost
user: root
password: root
port: 3306
database: teleagro
````
As credencias são tanto para a aplicação quanto para um client conectar-se ao MySQL.<br>
Na raiz do projeto ``database/createDatabase.sql``, o arquivo createDatabase.sql contém os comandos para criar o banco e suas respectivas tabelas.

## Rodando o projeto
Na raiz do repositório, rode o seguinte comando:
````
npm start
````
Pronto, agora é só utilizar!
