import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const UserService = {
  getAllUsers: async (user) => {
    console.log('user2:', user);
    try {
      if (user.role === 'admin') {
        const users = await User.find();
        console.log('users:', users);
        return users;
      }
      throw new Error('Unauthorized');
    } catch (error) {
      console.log('error:', error);
      throw new Error(error.message);
    }
  },

  createUser: async (userData) => {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  registerUser: async (userData) => {
    try {
      const { firstName, lastName, email, password } = userData;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword
      });
      await user.save();
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      );

      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  loginUser: async (userData) => {
    try {
      const { email, password } = userData;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '5h' }
      );
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      );
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  refreshToken: async (user, token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      if (decoded.userId !== user._id.toString()) {
        throw new Error('Invalid token');
      }
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      );
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getUserById: async (userId, currentUser) => {
    try {
      if (
        currentUser.role === 'admin' ||
        currentUser._id.toString() === userId
      ) {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      }
      throw new Error('Unauthorized');
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getProfile: async (userId, userData) => {
    try {
      const { firstName, lastName, email } = userData;
      const user = await User.findByIdAndUpdate(
        userId,
        { firstName, lastName, email },
        { new: true }
      );
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateUser: async (userId, userData, currentUser) => {
    try {
      if (
        currentUser.role === 'admin' ||
        currentUser._id.toString() === userId
      ) {
        const user = await User.findByIdAndUpdate(userId, userData, {
          new: true
        });
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      }
      throw new Error('Unauthorized');
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteUser: async (userId, currentUser) => {
    try {
      if (
        currentUser.role === 'admin' ||
        currentUser._id.toString() === userId
      ) {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
          throw new Error('User not found');
        }
        return { message: 'User deleted' };
      }
      throw new Error('Unauthorized');
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default UserService;
