import { CommentVoteCollection } from "../models/commentVotes.model";
import { AppError } from "../utils/error";
import { BAD_REQUEST } from "../utils/http-status";
import { getIcommentByIdService, updateCommentVoteService } from "./comments.service";
import { getOneUserService, updateUserScoreService } from "./users.service";

export const voteCommentService = async (commentId: string, ideaId: string, vote: number, userId: string) => {


  const voteExists = await CommentVoteCollection.findOne({ userId: userId, commentId :commentId });

  if (voteExists) {
    throw new AppError("already voted on this comment", BAD_REQUEST);
  }
  

  const commentVote = await CommentVoteCollection.create({
    commentId,
    ideaId,
    vote,
    userId: userId
  })

  const comment = await getIcommentByIdService(commentId)
  const user =  await getOneUserService(comment.userId.toString())

  if(vote == 1){
    
    // update user score
    updateUserScoreService(comment.userId.toString(), {score: Number(user?.score) + Number(1)})

    updateCommentVoteService(commentId, {totalUpvotes: comment.totalUpvotes + 1})
  } if(vote == -1){

    // update user score
    updateUserScoreService(comment.userId.toString(), {score: Number(user?.score) - Number(1)})

    updateCommentVoteService(commentId, {totalDownvotes: comment.totalDownvotes - 1})
  }

  return commentVote;
};

export const getCommentVotesService = async (commentId: string) => {

  const commentVotes = await CommentVoteCollection.find({ commentId: commentId })

  if (!commentVotes) {
    throw new AppError("comment votes not found", BAD_REQUEST);
  }

  let sum = 0;

  commentVotes.map((commentVote) => {
    sum += commentVote.vote;
  });

  return sum;
};