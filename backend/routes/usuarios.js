const express = require("express");
const router = express.Router();
const db = require("../db-service/index");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);

// middleware específico para este roteador
router.use((req, res, next) => {
  console.log("Horário de tentativa USUARIO: ", Date.now());
  next();
});
// define a rota da homepage
router.get("/", (req, res) => {
  res.send("Homepage de escolas");
});

router.post("/login", async (req, res) => {
  const { nome, email, senha, cpf, telefone } = req.body;

  if (!email) {
    return res.status(400).send("Email é necessário");
  }
  if (!senha) {
    return res.status(400).send("Senha é necessária");
  }

  const querySearchUser = "SELECT * FROM usuario WHERE email = ? AND senha = ?";
  //   const queryCreateUser = "INSERT INTO usuario (nome, email, senha, cpf, telefone) VALUES (?, ?, ?, ?, ?)";

  //

  try {
    // Execute a consulta para verificar o usuário
    const [results] = await db.execute(querySearchUser, [email, senha]);

    if (results.length > 0) {
      // Usuário encontrado, gerar JWT
      console.log('achou user')
      const user = results[0];
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' } // Token expira em 1 hora
      );

      // Retorna o JWT no corpo da resposta
      res.json({ message: 'Login Efetuado com sucesso', token });
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (err) {
    res.status(500).send('Erro ao buscar usuário');
  }
});

module.exports = router;
