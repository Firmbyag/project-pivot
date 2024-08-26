const express = require("express");
const router = express.Router();
const connection = require("../db-service/index");
const verifyDiretor = require("../middleware/verifyDiretorRole.js");

// middleware específico para este roteador
router.use((req, res, next) => {
  console.log("Horário de CONSULTA ESCOLA: ", Date.now());
  next();
});

router.get("/ajuda", (req, res) => {
  res.send("Ajuda sobre escolas");
});

router.get("/", async (req, res) => {
  const query = "SELECT * FROM escolas";
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao buscar escolas");
    } else {
      if (results.length === 0) {
        return res.status(404).send("Nenhuma escola encontrada");
      } else {
        return res.status(200).send(results);
      }
    }
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM escolas WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao buscar a escola");
    } else {
      if (results.length === 0) {
        return res.status(404).send("Escola não encontrada");
      } else {
        return res.status(200).send(results[0]);
      }
    }
  });
});

router.get('/:usuario_id', async (req, res) => {
  const { usuario_id } = req.params;

  const query = "SELECT e.* FROM escolas e JOIN usuario_escolas ue ON e.id = ue.escola_id WHERE ue.usuario_id = ?";

  connection.query(query, [usuario_id], (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao buscar a escola");
    } else {
      if (results.length === 0) {
        return res.status(404).send("Escola não encontrada");
      } else {
        return res.status(200).send(results[0]);
      }
    }
  });
});


router.post("/filtrar", async (req, res) => {
  // Obtém os filtros do corpo da requisição
  const { cidade, bairro, grau_ensino } = req.body;

  // Começa a construção da query base
  let query = "SELECT * FROM escolas";
  const filters = [];
  const values = [];

  // Adiciona os filtros à query se eles estiverem presentes
  if (cidade) {
    filters.push("cidade LIKE ?");
    values.push(`%${cidade}%`);
  }
  if (bairro) {
    filters.push("bairro = ?");
    values.push(bairro);
  }
  if (grau_ensino) {
    filters.push("grau_ensino = ?");
    values.push(grau_ensino);
  }

  // Se houver filtros, adiciona a cláusula WHERE na query
  if (filters.length > 0) {
    query += " WHERE " + filters.join(" AND ");
  }

  // Executa a query no banco de dados
  connection.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao buscar escolas");
    } else {
      if (results.length === 0) {
        return res.status(404).send("Nenhuma escola encontrada");
      } else {
        return res.status(200).send(results);
      }
    }
  });
});

// router.post("/atualizar-escola", async (req, res) => {
//   const { email, novaSenha } = req.body;

//   if (!nome) {
//     return res.status(400).send("Nome é necessário");
//   }
//   if (!senha) {
//     return res.status(400).send("Senha é necessária");
//   }
//   if (!email) {
//     return res.status(400).send("Email é necessário");
//   }
//   if (!cpf) {
//     return res.status(400).send("Cpf é necessário");
//   }

//   const queryUpdateUser = "UPDATE usuario SET senha = ? WHERE email = ?";
//   connection.query(queryUpdateUser, [novaSenha, email], (err, results) => {
//     if (err) {
//       return callback(err, null);
//     }
//     if (results.affectedRows > 0) {
//       callback(null, "Senha atualizada com sucesso");
//     } else {
//       callback(null, "Usuário não encontrado");
//     }
//   });
// });

router.get("/minhas-escolas", verifyDiretor, async (req, res) => {
  try {
    const [rows] = await connection.query(
      "SELECT * FROM escolas WHERE diretor_id = ?",
      [req.user.id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhuma escola encontrada para este diretor." });
    }

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
