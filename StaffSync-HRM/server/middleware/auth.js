const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const bearer = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(bearer, process.env.JWT_SECRET || 'staffsync_secret_jwt_key_2026');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
