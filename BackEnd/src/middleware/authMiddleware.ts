import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'Password123_Secret';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ description: 'Token no enviado' });
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, user: any) => {
        if (err) {
            return res.status(401).json({ description: 'Token inválido' });
        }
        // TypeScript ahora entiende que `req` puede tener la propiedad `user`
        req.user = user;
        next();
    });
};