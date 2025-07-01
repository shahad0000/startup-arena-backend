import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { getUsersService, deleteUserService } from "../services/admin.service";

export const getUsers = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const users = await getUsersService();
  res.json({ status: "success", data: users });
  return;
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await deleteUserService(id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json({ status: "success", message: "User deleted" });
  return;
};
