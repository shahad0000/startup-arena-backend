import axios from "axios";
import fs from "fs";
import path from "path";

export const downloadZoomRecording = async (downloadUrl: string, uuid: string): Promise<string> => {
  const filePath = path.join(__dirname, `../../downloads/${uuid}.mp4`);
  const writer = fs.createWriteStream(filePath);

  const response = await axios.get(downloadUrl, {
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", () => resolve(filePath));
    writer.on("error", reject);
  });
};
