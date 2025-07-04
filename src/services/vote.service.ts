import { VoteCollection } from "../models/votes.model";
import { AppError } from "../utils/error";
import { BAD_REQUEST } from "../utils/http-status";
import {
  getIdeaByIdService,
  makeVentureBoardService,
  updateIdeaVotesService,
} from "./ideas.service";

export const postVoteService = async (
  userId: string,
  ideaId: string,
  value: number 
) => {
  const existingVote = await VoteCollection.findOne({ userId, ideaId });

  if (value === 0) {
    if (!existingVote) {
      const updatedIdea = await getIdeaByIdService(ideaId);
      return {
        message: "no vote to remove",
        totalVotes: {
          totalUpvotes: updatedIdea.totalUpvotes,
          totalDownvotes: updatedIdea.totalDownvotes,
        },
      };
    }

    await VoteCollection.deleteOne({ userId, ideaId });
    const inc = existingVote.value === 1
      ? { totalUpvotes: -1 }
      : { totalDownvotes: -1 };

    await updateIdeaVotesService(ideaId, inc);

  } else if (!existingVote) {
    await VoteCollection.create({ userId, ideaId, value });
    const inc = value === 1
      ? { totalUpvotes: 1 }
      : { totalDownvotes: 1 };

    await updateIdeaVotesService(ideaId, inc);

  } else if (existingVote.value !== value) {
    await VoteCollection.updateOne({ userId, ideaId }, { value });

    const voteChange = value === 1
      ? { totalUpvotes: 1, totalDownvotes: -1 }  
      : { totalUpvotes: -1, totalDownvotes: 1 }; 

    await updateIdeaVotesService(ideaId, voteChange);

  } else {
    const updatedIdea = await getIdeaByIdService(ideaId);
    return {
      message: "vote unchanged",
      totalVotes: {
        totalUpvotes: updatedIdea.totalUpvotes,
        totalDownvotes: updatedIdea.totalDownvotes,
      },
    };
  }

  const updatedIdea = await getIdeaByIdService(ideaId);
  return {
    message: "vote updated",
    totalVotes: {
      totalUpvotes: updatedIdea.totalUpvotes,
      totalDownvotes: updatedIdea.totalDownvotes,
    },
  };
};

export const getUserVoteService = async (userId: string, ideaId: string) => {
  const vote = await VoteCollection.findOne({ userId, ideaId });
  return vote ? vote.value : null;
};

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
  if (sum >= 5) {
    await makeVentureBoardService(ideaId);
  }

  return sum;
};

export const getVotebyIdService = async (ideaId: string) => {
  const vote = await VoteCollection.find({ ideaId: ideaId })
    .populate({ path: "userId", select: ["-createdAt", "-updatedAt"] })
    .select(["-_id", "-ideaId", "-__v", "-createdAt", "-updatedAt"]);

  return vote;
};
