import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createUserService,
  getUsersService,
  updateUserService,
  deleteUserService,
  deleteAllUsersService
} from "../services/admin.service";

export const createUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
  try {
    const { name, email, password, role } = req.body;

    const user = await createUserService({ name, email, password, role });

    res.status(201).json({ status: "success", data: { user } });
    return;
  } catch (err: any) {
    next(err);
  }
};

export const getUsers = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const users = await getUsersService();
  res.json({ status: "success", data: users });
  return;
};

// update users
export const updateUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;

  const user = await updateUserService(id, updates);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json({ status: "success", data: { user } });
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

// Delete all users
export const deleteAllUsers = async (req: Request, res: Response) => {
    try {
      const result = await deleteAllUsersService();
  
      res.json({
        status: "success",
        message: `All users deleted successfully`,
        deletedCount: result.deletedCount,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };


// get all reports
export const getReports = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  // const users = await getUsersService();
  
  // res.json({ status: "success", data: users });
  return;
};
  
