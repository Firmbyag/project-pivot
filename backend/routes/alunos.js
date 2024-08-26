const express = require("express");
const router = express.Router();
const connection = require("../db-service/index");
const verifyDiretor = require("../middleware/verifyDiretorRole.js");

// middleware específico para este roteador
router.use((req, res, next) => {
  console.log("Horário: ", Date.now());
  next();
});
// define a rota 'ajuda'
router.get("/ajuda", (req, res) => {
  res.send("Ajuda sobre Students");
});

router.get("/meus-alunos", verifyDiretor, async (req, res) => {
  try {
    const [rows] = await connection.query(
      "SELECT * FROM alunos WHERE escola_id = ?",
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Nenhum aluno encontrado" });
    }

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/criar", verifyDiretor, async (req, res) => {
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
    "INSERTO INTO alunos (nome_aluno, nome_responsavel, cpf_responsavel, serie_periodo, ano, status, escola_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

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
        return res.status(500).send("Erro ao cadastrar aluno");
      } else {
        return res
          .status(200)
          .send({ msg: "Aluno Cadastrado com Sucesso", results });
      }
    }
  );
});

router.post("/atualizar", verifyDiretor, async (req, res) => {
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
        return callback(err, null);
      }
      if (results.affectedRows > 0) {
        callback(null, "Aluno atualizado com sucesso");
      } else {
        callback(null, "Aluno não encontrado");
      }
    }
  );
});

router.delete("/:id", verifyDiretor, async (req, res) => {
  const alunoId = req.params.id;

  try {
    // Verificar se o aluno pertence à escola do diretor
    const [aluno] = await connection.query(
      "SELECT * FROM alunos WHERE id = ? AND escola_id = ?",
      [alunoId, req.user.id]
    );

    if (aluno.length === 0) {
      return res.status(404).json({
        message: "Aluno não encontrado ou não pertence à sua escola.",
      });
    }

    // Deletar o aluno
    await connection.query("DELETE FROM alunos WHERE id = ?", [alunoId]);

    res.json({ message: "Aluno deletado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

module.exports = router;
