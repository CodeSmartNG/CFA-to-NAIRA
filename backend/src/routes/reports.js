import { Router } from 'express';
import { dashboard } from '../controllers/reportController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();
router.get('/dashboard', protect, adminOnly, dashboard);
export default router;
