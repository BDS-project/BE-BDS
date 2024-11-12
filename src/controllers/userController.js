import UserService from '../services/UserService.js';

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  registerUser: async (req, res) => {
    try {
      const { token } = await UserService.registerUser(req.body);
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { token } = await UserService.loginUser(req.body);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = await UserService.getProfile(req.user._id, req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const result = await UserService.deleteUser(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export default UserController;
