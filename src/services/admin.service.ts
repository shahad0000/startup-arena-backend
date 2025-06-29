import { UsersCollection } from "../models/user.model";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export const createUserService = async (data: CreateUserDTO) => {
  const user = await UsersCollection.create(data);
  return user;
};

export const getUsersService = async () => {
  return UsersCollection.find({});
};

export const updateUserService = async (id: string, updates: UpdateUserDTO) => {
  const user = await UsersCollection.findByIdAndUpdate(id, updates, { new: true });
  return user;
};

export const deleteUserService = async (id: string) => {
  const user = await UsersCollection.findByIdAndDelete(id);
  return user;
};

export const deleteAllUsersService = async () => {
  return await UsersCollection.deleteMany({});
};
