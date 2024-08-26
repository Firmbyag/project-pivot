require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000

app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // Substitua pelo seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

const alunos = require('./routes/alunos')
const bairros = require('./routes/bairros')
const bolsas = require('./routes/bolsas')
const cidades = require('./routes/cidades')
const ensino = require('./routes/ensino')
const escolas = require('./routes/escolas')
const usuarios = require('./routes/usuarios')

// ...
app.use('/alunos', alunos)
app.use('/bairros', bairros)
app.use('/bolsas', bolsas)
app.use('/cidades', cidades)
app.use('/ensino', ensino)
app.use('/escolas', escolas)
app.use('/usuarios', usuarios)


app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`)
})