const express = require("express");
const router = express.Router();
const connection = require("../db-service/index");
const jwt = require("jsonwebtoken");
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
  res.send("Homepage de USUÁRIOS");
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email) {
    return res.status(400).send("Email é necessário");
  }
  if (!senha) {
    return res.status(400).send("Senha é necessária");
  }

  const querySearchUser = "SELECT * FROM usuario WHERE email = ? AND senha = ?";
  connection.query(querySearchUser, [email, senha], (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao buscar usuário");
    } else {
      if (results.length === 0) {
        return res.status(404).send("Usuário não encontrado");
      } else {
        const token = jwt.sign(
          {
            id: results[0].id,
            nome: results[0].nome,
            email: results[0].email,
            role: results[0].role,
          },
          JWT_SECRET,
          { expiresIn: "1h" }
        );
        return res
          .status(200)
          .send({ msg: "Login efetuado com sucesso", token, results });
      }
    }
  });
});

router.post("/cadastro", async (req, res) => {
  const { nome, email, senha, cpf } = req.body;

  if (!nome) {
    return res.status(400).send("Nome é necessário");
  }
  if (!senha) {
    return res.status(400).send("Senha é necessária");
  }
  if (!email) {
    return res.status(400).send("Email é necessário");
  }
  if (!cpf) {
    return res.status(400).send("Cpf é necessário");
  }

  const queryCreateUser =
    "INSERT INTO usuario (nome, email, senha, cpf) VALUES (?, ?, ?, ?)";
  connection.query(
    queryCreateUser,
    [nome, email, senha, cpf],
    (err, results) => {
      if (err) {
        return res.status(500).send("Erro ao cadastrar usuário");
      } else {
        return res
          .status(200)
          .send({ msg: "Usuário Cadastrado com Sucesso", results });
      }
    }
  );
});

router.post("/alterar-senha",  async (req, res) => {
  const { email, novaSenha } = req.body;

  if (!nome) {
    return res.status(400).send("Nome é necessário");
  }
  if (!senha) {
    return res.status(400).send("Senha é necessária");
  }
  if (!email) {
    return res.status(400).send("Email é necessário");
  }
  if (!cpf) {
    return res.status(400).send("Cpf é necessário");
  }

  const queryUpdateUser =
    "UPDATE usuario SET senha = ? WHERE email = ?";
    connection.query(queryUpdateUser, [novaSenha, email], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.affectedRows > 0) {
        callback(null, 'Senha atualizada com sucesso');
      } else {
        callback(null, 'Usuário não encontrado');
      }
    });
});



module.exports = router;
