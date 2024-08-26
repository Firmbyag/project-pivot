const express = require("express");
const router = express.Router();
const connection = require("../db-service/index");
const verifyDiretor = require("../middleware/verifyDiretorRole.js");
const authenticateToken = require("../middleware/authMiddleware.js");

// middleware específico para este roteador
router.use((req, res, next) => {
  console.log("Horário: ", Date.now());
  next();
});
// define a rota 'ajuda'
router.get("/ajuda", (req, res) => {
  res.send("Ajuda sobre Students");
});

router.get("/meus-alunos/:escola_id", authenticateToken, async (req, res) => {
  const escola_id = req.params.escola_id;
  const query = "SELECT * FROM alunos WHERE escola_id = ?";

  try {
    connection.query(query, [escola_id], (err, results) => {
      if (err) {
        return res.status(500).send("Erro ao buscar alunos");
      } else {
        if (results.length === 0) {
          return res.status(404).send("Alunos não encontrados");
        } else {
          return res.status(200).send(results);
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/criar", authenticateToken, async (req, res) => {
  const {
    nome_aluno,
    nome_responsavel,
    cpf_responsavel,
    serie_periodo,
    ano,
    status,
    escola_id,
  } = req.body;

  if (!nome_aluno) {
    return res.status(400).send("Nome do aluno é necessário");
  }
  if (!nome_responsavel) {
    return res.status(400).send("Nome do Responsável é necessária");
  }
  if (!cpf_responsavel) {
    return res.status(400).send("Cpf do Responsável é necessário");
  }
  if (!serie_periodo) {
    return res.status(400).send("Série é necessário");
  }
  if (!status) {
    return res.status(400).send("Status é necessário");
  }
  if (!escola_id) {
    return res.status(400).send("Escola é necessário");
  }
  const query =
    "INSERT INTO alunos (nome_aluno, nome_responsavel, cpf_responsavel, serie_periodo, ano, status, escola_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

  connection.query(
    query,
    [
      nome_aluno,
      nome_responsavel,
      cpf_responsavel,
      serie_periodo,
      ano,
      status,
      escola_id,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).send({ msg: err });
      } else {
        return res
          .status(200)
          .send({ msg: "Aluno Cadastrado com Sucesso", results });
      }
    }
  );
});

router.post("/atualizar", authenticateToken, async (req, res) => {
  const {
    nome_aluno,
    nome_responsavel,
    cpf_responsavel,
    serie_periodo,
    ano,
    status,
    escola_id,
  } = req.body;

  if (!nome_aluno) {
    return res.status(400).send("Nome do aluno é necessário");
  }
  if (!nome_responsavel) {
    return res.status(400).send("Nome do Responsável é necessária");
  }
  if (!cpf_responsavel) {
    return res.status(400).send("Cpf do Responsável é necessário");
  }
  if (!serie_periodo) {
    return res.status(400).send("Série é necessário");
  }
  if (!status) {
    return res.status(400).send("Status é necessário");
  }
  if (!escola_id) {
    return res.status(400).send("Escola é necessário");
  }

  const queryUpdateUser =
    "UPDATE alunos SET nome_aluno = ? nome_responsavel = ? cpf_responsavel = ? serie_periodo = ? ano = ? status = ? escola_id = ? senha = ? WHERE email = ?";
  connection.query(
    queryUpdateUser,
    [
      nome_aluno,
      nome_responsavel,
      cpf_responsavel,
      serie_periodo,
      status,
      escola_id,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).send("Erro interno no servidor")
      }
      if (results.affectedRows > 0) {
        return res.status(200).send("Aluno atualizado com sucesso");
      } else {
        return res.status(404).send("Aluno não encontrado")
      }
    }
  );
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM alunos WHERE id = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send("Erro interno no servidor")
    }
    if (results.affectedRows > 0) {
       return res.status(200).send("Aluno excluído com sucesso")
    } else {
      return res.status(404).send("Aluno não encontrado")
    }
  });
});

module.exports = router;
