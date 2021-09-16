import express from 'express';
import dogeAverage from 'dogeaverage';

const app = express();

app.get('/doge', async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const { first, last }  = req.query;
    const [firstId, lastId] = [+first, +last];

    // console.log({ first, last });
    const avgId = await dogeAverage(firstId, lastId);
    const data = { firstId, lastId, avgId };
    res.setHeader('Content-type','application/json');
    return res.status(200).send(data);
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));