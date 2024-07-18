import express from 'express';
import userRouter from './user/user.router';
import postRouter from './post/post.router';

const router = express.Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);

export default router;
