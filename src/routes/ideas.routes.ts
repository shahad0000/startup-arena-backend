import { Router } from 'express';
import { authorized } from '../middleware/auth.middleware';
import { createIdea, deleteIdeaById, getAllIdeas, getIdeaById, updateIdeaById } from "../controllers/ideas.controller"

const router = Router();

// todo
// GET /api/users/:userId/ideas Get all ideas submitted by a specific user

// Public routes
router.get('/', getAllIdeas);
router.get('/:id', getIdeaById);

// Authorized routes
router.post('/', authorized, createIdea);
router.put('/:id', authorized, updateIdeaById); // (only by owner)
router.delete('/:id', authorized, deleteIdeaById); // (only by owner)

export default router; 