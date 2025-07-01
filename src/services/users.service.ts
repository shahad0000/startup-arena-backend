import { UsersCollection } from "../models/user.model";
import { AppError } from "../utils/error";
import { BAD_REQUEST } from "../utils/http-status";

export const getAllUsersService = async () => {
  return await UsersCollection.find().select("name role city country");
};

export const getOneUserService = async (id: string) => {
  return await UsersCollection.findById(id).select("-password");
};

export const getMeService = async (id: string) => {
  return await UsersCollection.findById(id).select("-password");
};

export const updateUserScoreService = async (userId: string, updates: Object) => {

  const user = await UsersCollection.findOne({_id: userId})

  if (!user) {
    throw new AppError("comments not found", BAD_REQUEST);
  }

  const updatedUser = await UsersCollection.findByIdAndUpdate(userId, updates, {
    new: true,
  });

  return updatedUser
};
