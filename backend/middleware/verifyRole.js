const jwt = require('jsonwebtoken');

function verifyAdminRole(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Token não fornecido');
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verifica se o role no payload do token é 'ADMIN'
    if (decoded.role !== 'ADMIN') {
      return res.status(403).send('Acesso negado. Permissão insuficiente.');
    }

    // Se tudo estiver correto, passa para o próximo middleware ou rota
    req.user = decoded; // Opcional: Armazena o payload do token no request para uso posterior
    next();
  } catch (err) {
    return res.status(401).send('Token inválido ou expirado');
  }
}

module.exports = verifyAdminRole;
