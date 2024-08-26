// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mypassword',
  database: 'bolsalivre'
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ', err);
    process.exit(1);
  }
  console.log('Conectado ao banco de dados');
});

module.exports = connection;
