import { sendMeetingEmail } from "../utils/mailer";

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

  const sharedDetails = `
    <p><strong>Topic:</strong> ${topic}</p>
    <p><strong>Date:</strong> ${formattedTime}</p>
    <p><strong>Duration:</strong> ${duration} minutes</p>
    <p><a href="${join_url}">Click here to join the meeting</a></p>
  `;

  let senderSubject = "";
  let senderMessage = "";
  let recipientSubject = "";
  let recipientMessage = "";

  if (sender_role === "founder") {
    senderSubject = `Startup Arena – Your pitch session is ready`;
    senderMessage = `
      <h2>Your meeting is scheduled</h2>
      ${sharedDetails}
    `;

    recipientSubject = `Startup Arena – You’re invited to review a pitch`;
    recipientMessage = `
      <h2>Pitch Invitation</h2>
      ${sharedDetails}
    `;
  } else if (sender_role === "investor") {
    senderSubject = `Startup Arena – Your investor meeting is ready`;
    senderMessage = `
      <h2>Your meeting is scheduled</h2>
      ${sharedDetails}
    `;

    recipientSubject = `Startup Arena – An investor wants to meet you`;
    recipientMessage = `
      <h2>Investor Meeting Invite</h2>
      ${sharedDetails}
    `;
  } else {
    throw new Error("Invalid sender role");
  }

  // Send to sender
  await sendMeetingEmail(sender_email, senderSubject, senderMessage);

  // Send to recipient
  await sendMeetingEmail(recipient_email, recipientSubject, recipientMessage);
};
