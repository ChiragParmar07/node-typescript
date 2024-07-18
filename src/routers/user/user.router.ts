import express from 'express';
import * as userController from '../../controllers/user/user.controller';
const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.post('/login', userController.loginUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
