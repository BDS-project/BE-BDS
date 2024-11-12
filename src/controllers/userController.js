import UserService from '../services/UserService.js';
import { StatusCodes, ReasonPhrases } from '../utils/httpStatusCode/httpStatusCode.js';

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserService.getAllUsers(req.user);
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
      const { accessToken, refreshToken } = await UserService.registerUser(req.body);
      res.status(StatusCodes.CREATED).json({ accessToken, refreshToken });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { accessToken, refreshToken } = await UserService.loginUser(req.body);
      res.json({ accessToken, refreshToken });
    } catch (error) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const { accessToken, refreshToken } = await UserService.refreshToken(req.user, req.token);
      res.json({ accessToken, refreshToken });
    } catch (error) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await UserService.getUserById(req.params.id, req.user);
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
      const user = await UserService.updateUser(req.params.id, req.body, req.user);
      res.json(user);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const result = await UserService.deleteUser(req.params.id, req.user);
      res.json(result);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  }
};

export default UserController;
