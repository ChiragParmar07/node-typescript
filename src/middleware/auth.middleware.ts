import jwt from 'jsonwebtoken';
import * as userService from '../service/user/user.service';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Token not provided');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      throw new Error('Invalid token');
    }

    const user = await userService.findUserByEmail(decodedToken.email);
    if (!user) {
      throw new Error('User not found');
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
