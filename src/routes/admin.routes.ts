import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  deleteAllUsers
} from "../controllers/admin.controller";
import { authorized } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authorized);

// CRUD for users
// router.post("/users", createUser);         
router.get("/users", getUsers);     
// router.put("/users/:id", updateUser); 
router.delete("/users/:id", deleteUser);

export default router;
