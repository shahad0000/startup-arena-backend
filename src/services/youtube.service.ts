import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import path from "path";

const YT_CLIENT_ID = process.env.YT_CLIENT_ID!;
const YT_CLIENT_SECRET = process.env.YT_CLIENT_SECRET!;
const YT_REFRESH_TOKEN = process.env.YT_REFRESH_TOKEN!;
const YT_REDIRECT_URI = process.env.YT_REDIRECT_URI!;

export const getYoutubeAccessToken = async () => {
  const response = await axios.post("https://oauth2.googleapis.com/token", null, {
    params: {
      client_id: YT_CLIENT_ID,
      client_secret: YT_CLIENT_SECRET,
      refresh_token: YT_REFRESH_TOKEN,
      grant_type: "refresh_token",
    },
  });

  return response.data.access_token;
};

export const uploadVideoToYoutube = async (
  filePath: string,
  title: string,
  description: string
) => {
  const accessToken = await getYoutubeAccessToken();

  const fileStream = fs.createReadStream(filePath);

  const metadata = {
    snippet: {
      title,
      description,
    },
    status: {
      privacyStatus: "public",
    },
  };

  const form = new FormData();
  form.append("snippet", JSON.stringify(metadata), {
    contentType: "application/json",
    filename: "metadata.json",
  });
  form.append("video", fileStream, {
    contentType: "video/*",
    filename: path.basename(filePath),
  });

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    ...form.getHeaders(), 
  };

  const response = await axios.post(
    "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=multipart&part=snippet,status",
    form,
    { headers }
  );

  return response.data;
};
