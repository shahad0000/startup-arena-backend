import { sendMeetingEmail } from "../utils/mailer";
import schedule from "node-schedule";

interface MeetingEmailParams {
  sender_role: "founder" | "investor";
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
  sender_email,
  recipient_email,
  topic,
  join_url,
  start_time,
  duration,
}: MeetingEmailParams) => {
  const formattedTime = formatTime(start_time);

  const basicDetails = `
    <p><strong>Topic:</strong> ${topic}</p>
    <p><strong>Date:</strong> ${formattedTime}</p>
    <p><strong>Duration:</strong> ${duration} minutes</p>
  `;

  const linkDetails = `
    ${basicDetails}
    <p><a href="${join_url}">Click here to join the meeting</a></p>
  `;

  const senderSubject = sender_role === "founder"
    ? "Startup Arena – Your pitch session is ready"
    : "Startup Arena – Your investor meeting is ready";

  const recipientSubject = sender_role === "founder"
    ? "Startup Arena – You’re invited to review a pitch"
    : "Startup Arena – An investor wants to meet you";

  await sendMeetingEmail(
    sender_email,
    senderSubject,
    basicDetails + "<p>You will receive the join link at the scheduled time.</p>"
  );

  await sendMeetingEmail(
    recipient_email,
    recipientSubject,
    basicDetails + "<p>You will receive the join link at the scheduled time.</p>"
  );

  const whenToSend = new Date(start_time);

  schedule.scheduleJob(whenToSend, async () => {
    await sendMeetingEmail(sender_email, senderSubject + " – Join Now", linkDetails);
    await sendMeetingEmail(recipient_email, recipientSubject + " – Join Now", linkDetails);
    console.log(" Join link emails sent at:", new Date().toLocaleString());
  });
};
