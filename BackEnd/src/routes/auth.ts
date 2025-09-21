import { Router } from 'express';
import { login, refresh, getMe } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
router.post('/login', login);
router.post('/refresh', refresh);
router.get('/me', authenticateToken, getMe);

export default router;