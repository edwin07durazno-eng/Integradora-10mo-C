import { Router, Request, Response } from 'express';
import { login, refresh, getMe } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// ✅ Ruta de prueba: GET /api/auth
router.get('/', (req: Request, res: Response) => {
    res.json({ mensaje: 'Ruta /api/auth funcionando correctamente' });
});

router.post('/login', login);
router.post('/refresh', refresh);
router.get('/me', authenticateToken, getMe);

export default router;