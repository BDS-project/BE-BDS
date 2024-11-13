import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const UserService = {
  getAllUsers: async (user) => {
    try {
      if (user.role === 'admin') {
        const users = await User.find();
        return users;
      }
      throw new Error('Unauthorized');
    } catch (error) {
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
        firstName,
        lastName,
        email,
        password: hashedPassword
      });
      await user.save();
      const accessToken = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
      const refreshToken = jwt.sign({ userId: user._id }, 'secret_refresh_key', { expiresIn: '7d' });
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
      const accessToken = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
      const refreshToken = jwt.sign({ userId: user._id }, 'secret_refresh_key', { expiresIn: '7d' });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  refreshToken: async (user, token) => {
    try {
      const decoded = jwt.verify(token, 'secret_refresh_key');
      if (decoded.userId !== user._id.toString()) {
        throw new Error('Invalid token');
      }
      const accessToken = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
      const refreshToken = jwt.sign({ userId: user._id }, 'secret_refresh_key', { expiresIn: '7d' });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getUserById: async (userId, currentUser) => {
    try {
      if (currentUser.role === 'admin' || currentUser._id.toString() === userId) {
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
      const user = await User.findByIdAndUpdate(userId, { firstName, lastName, email }, { new: true });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateUser: async (userId, userData, currentUser) => {
    try {
      if (currentUser.role === 'admin' || currentUser._id.toString() === userId) {
        const user = await User.findByIdAndUpdate(userId, userData, { new: true });
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
      if (currentUser.role === 'admin' || currentUser._id.toString() === userId) {
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
