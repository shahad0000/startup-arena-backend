import { Request, Response, NextFunction } from "express";
import { OK } from "../utils/http-status";
import { IdeaCollection } from "../models/ideas.model"
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

    const idea = await IdeaCollection.findOne({_id: id})

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

    const { id } = req.params

    let { vote } =  req.body

    const idea = await IdeaCollection.findOne({_id: id})

    let totalUpvotes = idea?.totalUpvotes ?? 0
    let totalDownvotes = idea?.totalDownvotes ?? 0

    if (!idea) {
      res.status(404).json({ message: "idea not found" });
      return;
    }

    if (vote == 1){
      totalUpvotes += 1
    } else if (vote == -1){
      totalDownvotes += 1
    } else {
      res.status(403).json({ message: "invalid vote value" });
      return;
    }

    const updateIdea = await IdeaCollection.findByIdAndUpdate(id, {totalUpvotes, totalDownvotes}, { new: true });

    res.status(OK).json({
      status: "success",
      data: updateIdea
    });

  } catch (error) {
    console.error("getIdeaById ERROR:", error);
    next(error);
  }
};

export const getVotes = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params

    const idea = await IdeaCollection.findOne({_id: id})

    res.status(OK).json({
      status: "success",
      data: {
        totalUpvotes: idea?.totalUpvotes,
        totalDownvotes: idea?.totalDownvotes 
      }
    });

  } catch (error) {
    console.error("getVotes ERROR:", error);
    next(error);
  }
};

export const ideaDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {

    

  } catch (error) {
    console.error("getIdeaById ERROR:", error);
    next(error);
  }
};