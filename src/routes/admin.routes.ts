import express from "express";
import {
  getUsers,
  deleteUser,
  getReportedComments,
  getReportedUsers,
  blockUser,
} from "../controllers/admin.controller";
import { authorized, restrictTo } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authorized);

router.use(restrictTo("admin"));

// CRUD for users
router.get("/users", getUsers);
router.get("/repoted-comments", getReportedComments);
router.get("/repoted-users", getReportedUsers);
router.put("/block-user/:id", blockUser);    
router.delete("/users/:id", deleteUser);

export default router;
