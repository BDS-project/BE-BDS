import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../../models/User.js';

dotenv.config();

const authenticate = async (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Authentication failed');
  }

  const token = authHeader.split(' ')[1];
  console.log('token:', token);

  if (!token) throw new Error('Authorization header missing');

  try {
    console.log('process.env.JWT_SECRET:', process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded:', decoded);
    const user = await User.findById(decoded.userId);

    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    console.log('error:', error);
    throw new Error('Authentication failed');
  }
};

export default authenticate;
