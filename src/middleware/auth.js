import jwt from 'jsonwebtoken';

export default function authMiddleware(handler) {
  return async (req, res) => {
    try {
      // Get token from header
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;

      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  };
}