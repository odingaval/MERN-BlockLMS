const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check for id in decoded token
    if (!decoded.id) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    req.user = { id: decoded.id }; // ✅ Explicitly set req.user.id
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
