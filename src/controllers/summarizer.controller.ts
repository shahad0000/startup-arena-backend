import { Request, Response } from "express";
import { summarize } from "../services/summarizer.service";
import { getIdeaByIdService } from "../services/ideas.service";

export const summarizeIdeaController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const idea = await getIdeaByIdService(id);
    if (!idea) {
      res.status(404).json({ error: "Idea not found" });
    }

    const summary = await summarize(idea.description);
    res.status(200).json({ summary });
  } catch (error) {
    console.error("Summarization failed:", error);
    res.status(500).json({ error: "Failed to summarize idea" });
  }
};
