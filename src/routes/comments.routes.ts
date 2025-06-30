import { Router } from 'express';
import { authorized } from '../middleware/auth.middleware';
import { createComment, deleteComment, getComments, getCommentVotes, getIdeaComments, voteComment } from '../controllers/comments.controller';

const router = Router();

router.get('/', getComments); // get all comments
router.get('/:id', getIdeaComments); // get all comments for one idea by its id, id = idea id

router.post('/', authorized, createComment);
router.delete('/:id', authorized, deleteComment);

// comment votes
router.post('/vote', authorized, voteComment);
router.get('/vote/:id', getCommentVotes);

export default router; 