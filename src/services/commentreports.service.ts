import { CommentReportCollection } from "../models/commentReports.model";
import { CommentCollection } from "../models/comments.model";
import { UsersCollection } from "../models/user.model";
import { AppError } from "../utils/error";
import { BAD_REQUEST } from "../utils/http-status";

const REPORT_THRESHOLD = 3;

export const reportCommentService = async (commentId: string, reporterId: string) => {

  const existing = await CommentReportCollection.findOne({ commentId, reporterId});

  if (existing) {
    throw new AppError("already reported this comment", BAD_REQUEST);
  }

  const comment = await CommentCollection.findById(commentId);

  if (!comment) {
    throw new AppError("comment not found", BAD_REQUEST);
  }

  await CommentReportCollection.create({ commentId, reporterId });

  // find the reported
  const user = await UsersCollection.findById(comment.userId);

  if (!user) return null;

  // increment the "reportCount" counter
  const count = Number(user.reportCount || 0) + 1;

  const updates: any = { reportCount: count };

  if (count >= REPORT_THRESHOLD) {
    updates.blocked = true;
  }

  // update the user data: updates.blocked and user.reportCount
  await UsersCollection.findByIdAndUpdate(user._id, updates, { new: true });

  // return count, updates.blocked
  return { reportCount: count, blocked: count >= REPORT_THRESHOLD };
};