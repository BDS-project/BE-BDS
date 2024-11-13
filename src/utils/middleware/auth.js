import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

const authenticate = async (req) => {
  const token = req.headers.authorization || '';

  if (!token) throw new Error('Authorization header missing');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) throw new Error('User not active or not found');
    return user;
  } catch (error) {
    throw new Error('Authentication failed');
  }
};

export default authenticate;
