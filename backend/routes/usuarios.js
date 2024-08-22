const express = require('express')
const router = express.Router()
const db = require('../db-service/index');

const app = express()
app.use(
    express.urlencoded({
      extended: true
    })
  )

// middleware específico para este roteador
router.use((req, res, next) => {
  console.log('Horário: ', Date.now())
  next()
})
// define a rota da homepage
router.get('/', (req, res) => {
  res.send('Homepage de escolas')
})

router.post('/login', (req, res) => {
    const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email é necessário');
  }

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar usuário');
    }

    if (results.length > 0) {
      res.send('Usuário encontrado');
    } else {
      res.send('Usuário não encontrado');
    }
  });
  });

module.exports = router