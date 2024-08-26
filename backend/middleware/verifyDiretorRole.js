const jwt = require('jsonwebtoken');

function verifyDiretorRole(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Token não fornecido');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verifica se o role no payload do token é 'ADMIN'
    if (decoded.role !== 'DIRETOR') {
      return res.status(403).send('Acesso negado. Usuário não é do tipo diretor.');
    }

    // Se tudo estiver correto, passa para o próximo middleware ou rota
    req.user = decoded; // Opcional: Armazena o payload do token no request para uso posterior
    next();
  } catch (err) {
    return res.status(401).send('Token inválido ou expirado');
  }
}

module.exports = verifyDiretorRole;
