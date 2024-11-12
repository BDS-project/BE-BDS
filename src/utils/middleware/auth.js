import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import { StatusCodes } from '../httpStatusCode/httpStatusCode.js';

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No token provided' });
    }

    const [, token] = authHeader.split(' ');
    const decoded = jwt.verify(token, 'secret_key');
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};

export default authenticate;
