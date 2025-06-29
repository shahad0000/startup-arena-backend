import express from "express";
import { getAllUsers, getOneUser, getMe, getMyIdeas } from "../controllers/users.controller";
import { authorized } from "../middleware/auth.middleware";


const router = express.Router();

router.get("/", getAllUsers);
router.get("/me", authorized,  getMe)
router.get("/:id", getOneUser);
router.get("/myIdeas/:id", authorized, getMyIdeas) // Get all ideas submitted by a specific user


export default router;
