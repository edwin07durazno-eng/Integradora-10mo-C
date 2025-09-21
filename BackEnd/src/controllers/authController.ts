import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'Password123_Access';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'Password123_Refresh';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ description: 'Credenciales incorrectas' });
        }
        const accessToken = jwt.sign({ id: user.id, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const refresh = (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(403).json({ description: 'Refresh token no enviado' });
    }
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ description: 'Refresh token inválido o expirado' });
        }
        const accessToken = jwt.sign({ id: user.id, role: 'owner' }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.json({ accessToken });
    });
};

export const getMe = async (req: Request, res: Response) => {
    try {
        // TypeScript ahora reconoce `req.user`
        const user = await User.findByPk(req.user!.id, {
            attributes: ['id', 'username', 'role'],
        });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};