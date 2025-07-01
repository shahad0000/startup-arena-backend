import express from "express";
import {
  getUsers,
  deleteUser,
} from "../controllers/admin.controller";
import { authorized, restrictTo } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authorized);

router.use(restrictTo("admin"));

// CRUD for users
router.get("/users", getUsers);     
router.delete("/users/:id", deleteUser);

export default router;
