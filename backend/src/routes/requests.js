import { Router } from 'express';
import {
  createRequest, myRequests, cancelRequest,
  listAll, reviewRequest
} from '../controllers/requestController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();
router.post('/', protect, createRequest);
router.get('/mine', protect, myRequests);
router.patch('/:id/cancel', protect, cancelRequest);
router.get('/', protect, adminOnly, listAll);
router.patch('/:id/review', protect, adminOnly, reviewRequest);
export default router;
