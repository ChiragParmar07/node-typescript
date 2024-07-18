import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userService from '../../service/user/user.service';

export async function createUser(req: Request, res: Response): Promise<void> {
  let { username, email, password } = req.body;
  try {
    password = await bcryptjs.hash(password, 12);
    const user = await userService.createUser({ username, email, password });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export const loginUser = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  try {
    const user: any = await userService.findUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user && (await bcryptjs.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(parseInt(id, 10));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { username, email } = req.body;
  try {
    const result = await userService.updateUser(parseInt(id, 10), username, email);
    if (result[0] === 1) {
      res.json(result[1][0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const result = await userService.deleteUser(parseInt(id, 10));
    if (result === 1) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
