import { UsersCollection } from "../models/user.model";

export const getAllUsersService = async () => {
  return await UsersCollection.find().select("name role city country");
};

export const getOneUserService = async (id: string) => {
  return await UsersCollection.findById(id).select("-password");
};

export const getMeService = async (id: string) => {
  return await UsersCollection.findById(id).select("-password");
};
