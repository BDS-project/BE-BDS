import UserService from '../services/UserService.js';
import { StatusCodes, ReasonPhrases } from '../utils/httpStatusCode/httpStatusCode.js';

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },

  createUser: async (req, res) => {
    try {
      const user = await UserService.createUser(req.body);
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  },

  registerUser: async (req, res) => {
    try {
      const { token } = await UserService.registerUser(req.body);
      res.status(StatusCodes.CREATED).json({ token });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { token } = await UserService.loginUser(req.body);
      res.json({ token });
    } catch (error) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = await UserService.getProfile(req.user._id, req.body);
      res.json(user);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const result = await UserService.deleteUser(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  }
};

export default UserController;
