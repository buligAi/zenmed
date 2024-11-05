import { User } from '../models/user.model.js';
import logger from '../config/logger.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    
    const { password, ...userWithoutPassword } = user.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};