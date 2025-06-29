import express, { Request, Response } from "express";
import { createMeeting } from "../controllers/zoom.controller";
import { authorized } from "../middleware/auth.middleware";
import { fetchRecordings } from "../controllers/zoom.controller";

const router = express.Router();

router.post("/create-meeting", createMeeting);
router.get("/recordings", fetchRecordings);

router.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Test route works!" });
});

export default router;
