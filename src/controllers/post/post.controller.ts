import { Request, Response } from 'express';
import * as postService from '../../service/post/post.service';

export async function createPost(req: Request, res: Response): Promise<void> {
  const { title, content, userId } = req.body;
  try {
    const post = await postService.createPost(title, content, userId);
    res.status(201).json(post);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllPosts(req: Request, res: Response): Promise<void> {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export async function getPostById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const post = await postService.getPostById(parseInt(id, 10));
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function updatePost(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const result = await postService.updatePost(parseInt(id, 10), title, content);
    if (result[0] === 1) {
      res.json(result[1][0]);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function deletePost(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const result = await postService.deletePost(parseInt(id, 10));
    if (result === 1) {
      res.json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPostsByUser(req: Request, res: Response): Promise<void> {
  const { userId } = req.params;
  try {
    const posts = await postService.getPostsByUser(parseInt(userId, 10));
    res.json(posts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPostsWithUsernames(req: Request, res: Response): Promise<void> {
  try {
    const posts = await postService.getPostsWithUsernames();
    res.json(posts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
