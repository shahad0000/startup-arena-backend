import axios from "axios";
import generateZoomToken from "../utils/generateZoomToken";

interface CreateMeetingParams {
  userId: string;
  topic?: string;
  duration?: number;
  type?: number;
  start_time?: string;
}

export const createZoomMeeting = async ({
  userId,
  topic = "Untitled Meeting",
  duration = 30,
  type = 2,
  start_time,
}: CreateMeetingParams) => {
  const token = await generateZoomToken();

  const payload = {
    topic,
    type,
    duration,
    start_time,

    settings: {
      host_video: true,
      participant_video: true,
      approval_type: 2,
      waiting_room: false,
      join_before_host: true,
      auto_recording: "cloud",
    },
  };

  const response = await axios.post(
    `https://api.zoom.us/v2/users/${userId}/meetings`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getUsersRecordings = async () => {
  const token = await generateZoomToken();
  const userId = process.env.ZOOM_USER_ID;

  const from = "2020-01-01";
  const to = new Date().toISOString().split("T")[0];

  const response = await axios.get(
    `https://api.zoom.us/v2/users/${userId}/recordings`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { from, to, page_size: 50 },
    }
  );

  return response.data;
};
