import { Request, Response, NextFunction } from "express";
import { OK } from "../utils/http-status";
import { CommentCollection } from "../models/comments.model"
import { AuthRequest } from "../middleware/auth.middleware";


export const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const comments = await CommentCollection.find({})

    if (!comments) {
      res.status(404).json({ message: "no ideas found" });
      return;
    }

    res.status(OK).json({
      status: "success",
      data: comments
    });

  } catch (error) {
    console.error("getAllIdeas ERROR:", error);
    next(error);
  }
};

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const idea = await CommentCollection.create(req.body)

    res.status(OK).json({
      status: "success",
      data: idea
    });

  } catch (error) {
    console.error("getAllIdeas ERROR:", error);
    next(error);
  }
};

export const updateComment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params
    const { userId } = req.body

    if (userId !== req.user.id) {
      res.status(401).json({ message: "you are not allowed to perform this task" });
      return;
    }

    const updates = req.body;
  
    const comment = await CommentCollection.findByIdAndUpdate(id, updates, { new: true });

    if (!comment) {
      res.status(404).json({ message: "comment not found" });
      return;
    }

    res.status(OK).json({
      status: "success",
      data: comment
    });

  } catch (error) {
    console.error("getAllIdeas ERROR:", error);
    next(error);
  }
};

export const deleteComment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {

      const { id } = req.params
      const { userId } = req.body
  
      if (userId !== req.user.id) {
        res.status(401).json({ message: "you are not allowed to perform this task" });
        return;
      }
    
      const comment = await CommentCollection.findByIdAndDelete(id);
  
      if (!comment) {
        res.status(404).json({ message: "comment not found" });
        return;
      }
  
      res.status(OK).json({
        status: "success",
        message: "successfully deleted comment"
      });

  } catch (error) {
    console.error("deleteComment ERROR:", error);
    next(error);
  }
};

export const getIdeaComments = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params

    const comments = await CommentCollection.find({ideaId: id})

    if (!comments) {
      res.status(404).json({ message: "no comments found" });
      return;
    }

    res.status(OK).json({
      status: "success",
      data: comments
    });

  } catch (error) {
    console.error("getIdeaComments ERROR:", error);
    next(error);
  }
};