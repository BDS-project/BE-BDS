import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const UserService = {
  getAllUsers: async (filter) => {
    try {
      let query = {};

      if (filter) {
        if (filter.role) query.role = filter.role;
        if (filter.status) query.status = filter.status;
        if (filter.email) query.email = { $regex: filter.email, $options: 'i' };
        if (filter.first_name)
          query.first_name = { $regex: filter.first_name, $options: 'i' };
        if (filter.last_name)
          query.last_name = { $regex: filter.last_name, $options: 'i' };
      }

      const page = filter?.page || 1;
      const limit = filter?.limit || 10;
      const skip = (page - 1) * limit;

      const users = await User.find(query);
      return users;
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

  registerUser: async ({ input }) => {
    try {
      const { first_name, last_name, email, password } = input;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        first_name: first_name,
        last_name: last_name,
        email,
        password: hashedPassword
      });
      await user.save();
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '5d' }
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
      const user = await User.findOne({ email }).exec();
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
        { expiresIn: '5d' }
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

  getUserById: async (userId) => {
    try {
      const userProfile = await User.findById(userId);

      if (userProfile.role === 'advisor') {
        await userProfile.populate({
          path: 'advisor_appointments',
          select:
            'status appointment_date property phone email full_name status',
          populate: {
            path: 'customer',
            select: 'first_name last_name email'
          }
        });
      } else {
        await userProfile.populate({
          path: 'customer_appointments',
          select:
            'status appointment_date property phone email full_name status',
          populate: {
            path: 'advisor',
            select: 'first_name last_name email'
          }
        });
      }

      return userProfile;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const user = await User.findByIdAndUpdate(userId, userData, {
        new: true
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteUser: async (userId) => {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return { message: 'User deleted' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default UserService;
