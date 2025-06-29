import { Request, Response } from "express";
import {
  createZoomMeeting,
  getUsersRecordings,
} from "../services/zoom.service";
import { handleMeetingEmails } from "../services/email.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const createMeeting = async (req: AuthRequest, res: Response) => {
  const { topic, duration, start_time, ideaId } = req.body;

  const sender_email = req.user.email;
  const sender_role = req.user.role;

  try {
    const recipient_email = "2055shahad@gmail.com";

    if (!sender_email || !sender_role || !recipient_email) {
      return res
        .status(400)
        .json({ error: "Missing sender or recipient info" });
    }

    const meetingData = await createZoomMeeting({
      userId: "me",
      topic,
      duration,
      start_time,
    });

    await handleMeetingEmails({
      sender_role,
      sender_email,
      recipient_email,
      topic,
      join_url: meetingData.join_url,
      start_time,
      duration,
    });

    res.status(201).json({
      message: "Meeting created and emails sent",
      meeting: meetingData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create meeting or send email" });
  }
};

export const fetchRecordings = async (req: Request, res: Response) => {
  try {
    const recordings = await getUsersRecordings();
    res.json(recordings);
  } catch (error) {
    console.error("Failed to get recordings", error);
    res.status(500).json({ error: "Failed to get recordings" });
  }
};
