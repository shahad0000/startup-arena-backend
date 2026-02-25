import { sendMeetingEmail } from "../utils/mailer";
import axios from "axios";

interface MeetingEmailParams {
  sender_role: "founder" | "investor";
  sender_name: string;
  sender_email: string;
  recipient_email: string;
  topic: string;
  join_url: string;
  start_time: string;
  duration: number;
}

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });
};

export const handleMeetingEmails = async ({
  sender_role,
  sender_name,
  sender_email,
  recipient_email,
  topic,
  join_url,
  start_time,
  duration,
}: MeetingEmailParams) => {
  const formattedTime = formatTime(start_time);
  console.log("Meeting start_time:", start_time);
  console.log("Meeting formattedTime:", formattedTime);

  const basicDetails = `
    <p><strong>Topic:</strong> ${topic}</p>
    <p><strong>Date & Time:</strong> ${formattedTime}</p>
    <p><strong>Duration:</strong> ${duration} minutes</p>
  `;

  const senderSubject =
    sender_role === "founder"
      ? "Startup Arena – Your pitch session is scheduled"
      : "Startup Arena – Your investor meeting is scheduled";

  const recipientSubject =
    sender_role === "founder"
      ? "Startup Arena – Invitation to review a pitch"
      : "Startup Arena – An investor wants to meet you";

  // Immediate confirmation emails 
  await sendMeetingEmail(
    sender_email,
    senderSubject,
    `
      <p>Hi ${sender_name},</p>
      <p>Your upcoming meeting has been scheduled. Here are the details:</p>
      ${basicDetails}
      <p>You will receive the join link right before the meeting starts.</p>
      <p>Best regards,<br/>The Startup Arena Team</p>
    `
  );

  await sendMeetingEmail(
    recipient_email,
    recipientSubject,
    `
      <p>Hi,</p>
      <p><strong>${sender_name}</strong> has invited you to an important meeting. Here are the details:</p>
      ${basicDetails}
      <p>The join link will be sent to you shortly before the meeting begins.</p>
      <p>Looking forward to connecting you soon!<br/>The Startup Arena Team</p>
    `
  );

  // Trigger n8n workflow for calendar + reminders
  try {
    const fullISOStartTime = new Date(start_time).toISOString();
    console.log("Meeting fullISOStartTime:", fullISOStartTime);
    await axios.post("https://flow-lab.app.n8n.cloud/webhook/meeting-schedule", {
      sender_role,
      sender_name,
      sender_email,
      recipient_email,
      topic,
      join_url,      
      start_time: fullISOStartTime,
      duration,
    });
    
  } catch (error) {
    console.error("Failed to trigger n8n workflow", error);
  }
};

