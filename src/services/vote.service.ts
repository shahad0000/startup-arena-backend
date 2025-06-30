import { VoteCollection } from "../models/votes.model";
import { AppError } from "../utils/error";
import { BAD_REQUEST } from "../utils/http-status";
import { getIdeaByIdService, makeVentureBoardService, updateIdeaVotesService } from "./ideas.service";

export const postVoteService = async (userId: string, ideaId: string, value: Number) => {

  const voteExists = await VoteCollection.findOne({ userId: userId, ideaId:ideaId });

  const idea = await getIdeaByIdService(ideaId)

  if (voteExists) {
    throw new AppError("already voted on this idea", BAD_REQUEST);
  }

  if(value == 1){
    await updateIdeaVotesService(ideaId, {totalUpvotes: idea.totalUpvotes + 1})
  } else if(value == -1){
    await updateIdeaVotesService(ideaId, {totalDownvotes: idea.totalDownvotes - 1})
  }

  const vote = await VoteCollection.create({
    ideaId,
    userId,
    value
  });

  return vote
};

// get the idea's total votes
export const getVotesService = async (ideaId: string) => {

    const votes = await VoteCollection.find({ ideaId: ideaId });

    if (!votes) {
      throw new AppError("idea not found", BAD_REQUEST);
    }

    let sum = 0;

    votes.map((vote) => {
      sum += vote.value;
    });

    // chech if idea reached 100 upvotes, 5 for testing
    if(sum >= 5){
      await makeVentureBoardService(ideaId)
    }

    return sum
};

export const getVotebyIdService = async (ideaId: string) => {

  const vote = await VoteCollection.find({ ideaId: ideaId })
    .populate({ path: "userId", select: ["-createdAt", "-updatedAt"] })
    .select(["-_id", "-ideaId", "-__v", "-createdAt", "-updatedAt"]);

    return vote
};