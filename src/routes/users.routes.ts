import express from "express";
import { getAllUsers, getOneUser, getMe } from "../controllers/users.controller";
import { authorized } from "../middleware/auth.middleware";


const router = express.Router();

router.get("/", getAllUsers);
router.get("/me", authorized,  getMe)
router.get("/:id", getOneUser);
export default router;
