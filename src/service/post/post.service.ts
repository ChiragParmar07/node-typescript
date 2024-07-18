import Post from '../../models/post/post.model';
import User from '../../models/user/user.models';

export async function createPost(title: string, content: string, userId: number): Promise<Post> {
  return Post.create({ title, content, userId });
}

export async function getAllPosts(): Promise<Post[]> {
  return Post.findAll();
}

export async function getPostById(id: number): Promise<Post | null> {
  return Post.findByPk(id);
}

export async function updatePost(id: number, title: string, content: string): Promise<[number, Post[]]> {
  return Post.update({ title, content }, { where: { id }, returning: true });
}

export async function deletePost(id: number): Promise<number> {
  const result = await Post.destroy({ where: { id } });
  return result;
}

export async function getPostsByUser(userId: number): Promise<Post[]> {
  return Post.findAll({ where: { userId } });
}

export async function getPostsWithUsernames(): Promise<any[]> {
  const data = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ['username', 'email'], // Select only the 'username' column
      },
    ],
  });

  return data;
}
