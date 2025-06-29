import { Request, Response } from "express";
import { IdeaCollection } from "../models/ideas.model"


export const ventureBoardIdeas = async (req: Request, res: Response) => {
  try {

    const ideas = await IdeaCollection.find({isOnVentureBoard: true})

    if (!ideas) {
      res.status(404).json({ message: "no ideas found" });
      return;
    }

    res.status(200).json({
      status: "success",
      data: ideas
    });


  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const ventureBoardIdeaDetails = async (req: Request, res: Response) => {
  try {

    const { id } = req.params

    const ideas = await IdeaCollection.findOne({isOnVentureBoard: true, _id: id}).populate("founderId")

    if (!ideas) {
      res.status(404).json({ message: "no ideas found" });
      return;
    }

    res.status(200).json({
      status: "success",
      data: ideas
    });


  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};