import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from './config.json';
import { IUser } from './users';
import tokenMap from './tokenMap';

const authJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, config.accessToken, (err: Error, user: IUser) => {
            if (err) {
                return res.sendStatus(403);
            }
            (req as any).user = user;
            if (tokenMap.get(user.username) !== token) {
                return res.sendStatus(403);
            }
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};

export default authJwt;