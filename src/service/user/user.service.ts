import User from '../../models/user/user.models';

export async function createUser(payload: any): Promise<User> {
  return User.create(payload);
}

export async function getAllUsers(): Promise<User[]> {
  return User.findAll();
}

export async function getUserById(id: number): Promise<User | null> {
  return User.findByPk(id);
}

export const findUserByEmail = (email: string): Promise<User> => {
  return User.findOne({ where: { email } });
};

export async function updateUser(id: number, username: string, email: string): Promise<[number, User[]]> {
  return User.update({ username, email }, { where: { id }, returning: true });
}

export async function deleteUser(id: number): Promise<number> {
  const result = await User.destroy({ where: { id } });
  return result;
}
