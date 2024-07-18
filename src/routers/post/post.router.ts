import express from 'express';
import * as postController from '../../controllers/post/post.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = express.Router();

router.use(authMiddleware);

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/withUsernames', postController.getPostsWithUsernames);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.get('/user/:userId', postController.getPostsByUser);

export default router;
