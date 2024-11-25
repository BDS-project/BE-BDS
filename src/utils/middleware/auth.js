import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../../models/User.js';
import { GraphQLError } from 'graphql';

dotenv.config();

const authenticate = async (req) => {
  const authHeader = req.headers.authorization;

  const token = authHeader.split(' ')[1];

  if (!token || !authHeader.startsWith('Bearer ')) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 }
      }
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    console.log("user:", user)

    if (!user) {
      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 }
        }
      });
    }
    return user;
  } catch (error) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 }
      }
    });
  }
};

export default authenticate;
