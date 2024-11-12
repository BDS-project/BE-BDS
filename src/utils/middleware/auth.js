import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret_key');
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
export default authenticate;
