import { Router } from 'express';
import { getRate, updateRate } from '../controllers/rateController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();
router.get('/', getRate);
router.put('/', protect, adminOnly, updateRate);
export default router;
