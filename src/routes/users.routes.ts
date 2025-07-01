import express from "express";
import { getAllUsers, getOneUser, getMe, getMyIdeas } from "../controllers/users.controller";
import { authorized } from "../middleware/auth.middleware";


const router = express.Router();

router.get("/me", authorized, getMe)
router.get("/myIdeas", authorized, getMyIdeas) 
router.get("/:id", authorized, getOneUser);


export default router;
