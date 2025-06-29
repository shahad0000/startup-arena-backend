import { Request, Response, NextFunction } from "express";
import { OK } from "../utils/http-status";
import { IdeaCollection } from "../models/ideas.model"
import { VoteCollection } from "../models/votes.model"
import { AuthRequest } from "../middleware/auth.middleware"; // Import custom request type that extends Request with a user field for authenticated users


export const getAllIdeas = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const ideas = await IdeaCollection.find({})

    if (!ideas) {
      res.status(404).json({ message: "no ideas found" });
      return;
    }

    res.status(OK).json({
      status: "success",
      data: ideas
    });

  } catch (error) {
    console.error("getAllIdeas ERROR:", error);
    next(error);
  }
};

export const createIdea = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const idea = await IdeaCollection.create(req.body)

    res.status(OK).json({
      status: "success",
      data: idea
    });

  } catch (error) {
    console.error("creatIdea ERROR:", error);
    next(error);
  }
};

export const getIdeaById = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params

    const idea = await IdeaCollection.findOne({_id: id}).populate("founderId")

    if (!idea) {
      res.status(404).json({ message: "idea not found" });
      return;
    }

    res.status(OK).json({
      status: "success",
      data: idea
    });

  } catch (error) {
    console.error("getIdeaById ERROR:", error);
    next(error);
  }
};

export const updateIdeaById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params

    // req.body.founderId: the idea author
    // req.user.id: the user requesting update

    if (req.body.founderId !== req.user.id) {
      res.status(401).json({ message: "you are not allowed to perform this task" });
      return;
    }

    const updates = req.body;
  
    const idea = await IdeaCollection.findByIdAndUpdate(id, updates, { new: true });

    if (!idea) {
      res.status(404).json({ message: "idea not found" });
      return;
    }

    res.status(OK).json({
      status: "success",
      data: idea
    });

  } catch (error) {
    console.error("getAllIdeas ERROR:", error);
    next(error);
  }
};

export const deleteIdeaById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params

    if (req.body.founderId !== req.user.id) {
      res.status(401).json({ message: "you are not allowed to perform this task" });
      return;
    }
  
    const idea = await IdeaCollection.findByIdAndDelete(id);

    if (!idea) {
      res.status(404).json({ message: "idea not found" });
      return;
    }

    res.status(OK).json({
      status: "success",
      message: "successfully deleted idea"
    });

  } catch (error) {
    console.error("getAllIdeas ERROR:", error);
    next(error);
  }
};

export const postVote = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const vote = await VoteCollection.create(req.body)

    res.status(OK).json({
      status: "success",
      data: {
        vote
      }
    });

  } catch (error) {
    console.error("getIdeaById ERROR:", error);
    next(error);
  }
};

export const getVotes = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params

    const votes = await VoteCollection.find({ideaId: id})

    let sum = 0

    votes.map((vote) => {
      sum += vote.value
    })

    res.status(OK).json({
      status: "success",
      data: {
        totalVotes: sum
      }
    });

  } catch (error) {
    console.error("getVotes ERROR:", error);
    next(error);
  }
};

export const ideaAnalatics = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params

    const votes = await VoteCollection.find({ideaId: id}).populate({path: "userId", select: ["-createdAt", "-updatedAt"]}).select(["-_id", "-ideaId", "-__v", "-createdAt", "-updatedAt"])

    res.status(OK).json({
      status: "success",
      data: {
        votes
      }
    });

  } catch (error) {
    console.error("getIdeaById ERROR:", error);
    next(error);
  }
};