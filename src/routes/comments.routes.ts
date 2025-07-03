import { Router } from 'express';
import { authorized } from '../middleware/auth.middleware';
import { createComment, deleteComment, getComments, getCommentVotes, getIdeaComments, voteComment } from '../controllers/comments.controller';

const router = Router();

router.get('/', getComments); // get all comments
router.get('/idea/:id', getIdeaComments); 
router.post('/idea/:id', authorized, createComment);
router.delete('/:id', authorized, deleteComment); // Delete a comment by id

// comment votes
router.post('/vote', authorized, voteComment);
router.get('/vote/:id', getCommentVotes);

export default router; 