import express, { Request, Response } from "express";
import { createMeeting, fetchRecordings } from "../controllers/zoom.controller";
import { authorized } from "../middleware/auth.middleware";
import { RequestHandler } from "express";

const router = express.Router();

router.post("/create-meeting", authorized, createMeeting as RequestHandler);
router.get("/recordings", fetchRecordings);

router.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Test route works!" });
});

export default router;
