import { Request, Response } from "express";
import { createZoomMeeting } from "../services/zoom.service";
import { getUsersRecordings } from "../services/zoom.service";

export const createMeeting = async (req: Request, res: Response): Promise<void> => {
  const { userId, topic, duration, type } = req.body;

  if (!userId) {
    res.status(400).json({ error: "userId is required" });
    return;
  }

  try {
    const meetingData = await createZoomMeeting({ userId, topic, duration, type });
    res.status(201).json(meetingData);
  } catch (err: any) {
    console.error("Meeting creation error:", err.response?.data || err.message || err);
    res.status(500).json({ error: "Failed to create Zoom meeting" });
  }
};

export const fetchRecordings = async (req: Request, res: Response) => {
  const userId = req.params.userId;  // Or get from auth session
  try {
    const recordings = await getUsersRecordings();
    res.json(recordings);
  } catch (error) {
    console.error("Failed to get recordings", error);
    res.status(500).json({ error: "Failed to get recordings" });
  }
};