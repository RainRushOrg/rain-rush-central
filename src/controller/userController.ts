import { Request, Response } from 'express'; 
import UserModel from '../models/UserModel';
import RunModel from '../models/RunModel';
import bcrypt from 'bcryptjs';
const User = UserModel;
const Run = RunModel;


// Create a new user
const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    const regexUsername = /^[a-zA-Z0-9_]{3,20}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!regexUsername.test(username)) {
      return res.status(400).json({ error: 'Invalid username format. Must be 3-20 characters long and can only contain letters, numbers, and underscores.' });
    }
    if (!regexEmail.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }
    if (!regexPassword.test(password)) {
      return res.status(400).json({ error: 'Invalid password format. Must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.' });
    }
    // Check if user already exists
    const userExists = await User.findOne({ where: { username } });
    const emailExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'Username unavailable' });
    }
    if (emailExists) {
      return res.status(400).json({ error: 'Email already registered' });
    } 
    const hashedPassword = bcrypt.hashSync(password, process.env.SALT_ROUNDS)
    const newUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: `User registered successfully: ${newUser.username}`, user: newUser });
  } catch (error) {
    if (error instanceof Error){
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

const checkUserNameAvailability = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const userExists = await User.findOne({ where: { username } });

    if (userExists) {
      return res.status(200).json({ available: false });
    }
    res.status(200).json({ available: true });
  } catch (error) {
    if (error instanceof Error){
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

const checkEmailAvailability = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const emailExists = await User.findOne({ where: { email } });

    if (emailExists) {
      return res.status(200).json({ available: false });
    }
    res.status(200).json({ available: true });
  } catch (error) {
    if (error instanceof Error){
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}


const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error){
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
};

// Get user by id


const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error){
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
};

// Update user by id 

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      throw new Error('User not found');
    }
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error){
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}; 

// Delete user by id 


const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      throw new Error('User not found');
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    if (error instanceof Error){
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
};

// get user by id with associated runs

const getUserWithRuns = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      include: [{ model: Run, as: 'runs', required: false }],
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error){
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}
const userController = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserWithRuns,
  checkUserNameAvailability,
  checkEmailAvailability,
};


export default userController;

