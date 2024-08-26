const express = require('express')
const router = express.Router()
const connection = require("../db-service/index");
const verifyDiretor = require("../middleware/verifyDiretorRole.js");
const authenticateToken = require("../middleware/authMiddleware.js");


// middleware específico para este roteador
router.use((req, res, next) => {
  console.log('Horário: ', Date.now())
  next()
})

router.get('/', (req, res) => {
  const query = "SELECT * FROM bolsas";
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao buscar bolsas");
    } else {
      if (results.length === 0) {
        return res.status(404).send("Nenhuma bolsa encontrada");
      } else {
        return res.status(200).send(results);
      }
    }
  });
})

router.get('/:id', (req, res) => {
  const bolsaId = req.params.id;

  const query = "SELECT * FROM bolsas WHERE id = ?";
  connection.query(query, [bolsaId], (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao buscar bolsas");
    } else {
      if (results.length === 0) {
        return res.status(404).send("Nenhuma bolsa encontrada");
      } else {
        return res.status(200).send(results);
      }
    }
  });
});

router.post("/criar", authenticateToken, async (req, res) => {
  const {
    etapa,
    serie,
    turno,
    mensalidade_sem_desconto,
    desconto_na_mensalidade,
    valor_da_matricula,
    vagas,
    info_adicional,
    escola_id
  } = req.body;

  if (!etapa) {
    return res.status(400).send("Etapa é necessário");
  }
  if (!serie) {
    return res.status(400).send("Série é necessária");
  }
  if (!turno) {
    return res.status(400).send("Turno é necessário");
  }
  if (!mensalidade_sem_desconto) {
    return res.status(400).send("Mensalidade sem desconto é necessário");
  }
  if (!desconto_na_mensalidade) {
    return res.status(400).send("Desconto na mensalidade é necessário");
  }
  if (!valor_da_matricula) {
    return res.status(400).send("Valor da matrícula é necessário");
  }
  if (!vagas) {
    return res.status(400).send("Vaga é necessário");
  }
  if (!escola_id) {
    return res.status(400).send("Escola é necessário");
  }


  let query = "INSERTO INTO bolsas (nome_aluno, nome_responsavel, cpf_responsavel, serie_periodo, ano, status, escola_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

  connection.query(
    query,
    [
      etapa,
      serie,
      turno,
      mensalidade_sem_desconto,
      desconto_na_mensalidade,
      valor_da_matricula,
      vagas,
      escola_id,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).send("Erro ao cadastrar bolsa");
      } else {
        return res
          .status(200)
          .send({ msg: "Bolsa Cadastrada com Sucesso", results });
      }
    }
  );


});

router.put('/atualizar/:escolaId', authenticateToken, async (req, res) => {
  const escolaId = req.params.escolaId;
  const {
      etapa,
      serie,
      turno,
      mensalidade_sem_desconto,
      desconto_na_mensalidade,
      valor_da_matricula,
      vagas,
      info_adicional
  } = req.body;

  try {
      const [result] = await pool.query(
          `UPDATE bolsas 
           SET 
              etapa = ?, 
              serie = ?, 
              turno = ?, 
              mensalidade_sem_desconto = ?, 
              desconto_na_mensalidade = ?, 
              valor_da_matricula = ?, 
              vagas = ?, 
              info_adicional = ?
           WHERE escola_id = ?`,
          [
              etapa,
              serie,
              turno,
              mensalidade_sem_desconto,
              desconto_na_mensalidade,
              valor_da_matricula,
              vagas,
              info_adicional,
              escolaId
          ]
      );

      if (result.affectedRows === 0) {
          return res.status(404).send("Nenhuma bolsa encontrada para essa escola.");
      }

      res.status(200).send("Bolsa(s) atualizada(s) com sucesso.");
  } catch (error) {
      console.error('Erro ao atualizar bolsas:', error);
      res.status(500).send("Erro ao atualizar bolsas.");
  }
});

router.delete('/:escolaId/:bolsaId', authenticateToken, async (req, res) => {
  const escolaId = req.params.escolaId;
  const bolsaId = req.params.bolsaId;

  try {
      const [result] = await pool.query(
          'DELETE FROM bolsas WHERE id = ? AND escola_id = ?',
          [bolsaId, escolaId]
      );

      if (result.affectedRows === 0) {
          return res.status(404).send("Nenhuma bolsa encontrada para esse id e escola.");
      }

      res.status(200).send("Bolsa deletada com sucesso.");
  } catch (error) {
      console.error('Erro ao deletar a bolsa:', error);
      res.status(500).send("Erro ao deletar a bolsa.");
  }
});


router.get('/ajuda', (req, res) => {
  res.send('Ajuda sobre bolsas')
})
module.exports = router