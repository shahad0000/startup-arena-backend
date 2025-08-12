
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,      
    pass: process.env.EMAIL_PASS,     
  },
});

export const sendMeetingEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  const info = await transporter.sendMail({
    from: `"Startup Arena" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });

  return info;
};
