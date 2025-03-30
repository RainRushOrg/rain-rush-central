import User from '../models/UserModel';
import bcrypt from 'bcryptjs';
import {Request, Response} from 'express';
import userController from './userController'
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

const register = async (req: Request, res: Response) => {
  userController.createUser(req, res);
}

const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: identifier },
          { email: identifier }
        ]
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    if (error instanceof Error){
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

const authController = {
  register,
  login
}
export default authController;

