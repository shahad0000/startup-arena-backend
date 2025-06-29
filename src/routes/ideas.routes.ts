import { Router } from 'express';
import { authorized } from '../middleware/auth.middleware';
import { createIdea, deleteIdeaById, getAllIdeas, getIdeaById, getVotes, ideaAnalatics, postVote, updateIdeaById } from "../controllers/ideas.controller"

const router = Router();

// Public routes
router.get('/', getAllIdeas);
router.get('/:id', getIdeaById);
router.get('/analytics/:id', ideaAnalatics); // get idea analytics

// Authorized routes
router.post('/', authorized, createIdea);
router.put('/:id', authorized, updateIdeaById); // (only by owner)
router.delete('/:id', authorized, deleteIdeaById); // (only by owner)

// votes
router.post('/vote/', authorized, postVote); // upvote/downvote idea by id (in body)
router.get('/vote/:id', getVotes); // get idea's total votes

export default router; 