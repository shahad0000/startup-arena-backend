import { CommentCollection } from "../models/comments.model";

export const createCommentService = async (
  userId: string,
  ideaId: string,
  text: string
) => {
  return await CommentCollection.create({
    userId,
    ideaId,
    text,
  });
};
