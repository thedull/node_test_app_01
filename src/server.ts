import express from 'express';
import dogeAverage from 'dogeaverage';
import jwt from 'jsonwebtoken';

import config from './config.json';
import { users } from './users';
import authJwt from './authJwt';

const accessTokenSecret = config.accessToken;

const app = express();
app.use(express.json());

app.get('/doge', authJwt, async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { first, last }  = req.query;
    const [firstId, lastId] = [+first, +last];

    // console.log({ first, last });
    const avgId = await dogeAverage(firstId, lastId);
    const data = { firstId, lastId, avgId };
    res.setHeader('Content-type','application/json');
    return res.status(200).send(data);
});

app.post('/login', (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;

    const user = users.find(user => {
        return user.username === username &&
        user.password === password
    });
    if (user) {
        const accessToken = jwt.sign({
            username: user.username,
            role: user.role
        }, accessTokenSecret);
        res.json({ accessToken });
    }
    else {
        res.sendStatus(401);
    }
});

app.get('/admin', authJwt, (req: express.Request, res: express.Response) => {
    const { role } = (req as any).user;
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    return res.send('Hello, admin');
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));