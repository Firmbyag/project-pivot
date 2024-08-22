// db.js
const mysql = require('mysql2');

// Criação da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mypassword',  // Substitua pela senha real do seu banco de dados
  database: 'bolsalivre'  // Substitua pelo nome real do seu banco de dados
});

// Conectar ao banco de dados
connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ', err);
    process.exit(1);
  }
  console.log('Conectado ao banco de dados');
});

module.exports = connection;
