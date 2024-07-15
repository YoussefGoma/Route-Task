import { verifyToken } from '../utils/auth.js';

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const [, token] = authHeader.split(' ');

  const userId = verifyToken(token);
  if (!userId) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.userId = userId;
  next();
};

export default auth;