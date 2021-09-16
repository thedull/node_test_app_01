import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dogeAverage from 'dogeAverage';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit(`{"message": "Connection successful (${new Date()})"`);
    socket.on('doge request', async msg => {
        const data = JSON.parse(msg);
        const { first, last } = data;
        // console.log({data, first, last})
        const avgId = await dogeAverage(first, last);
        const response = { first, last, avgId };
        socket.emit('doge response', JSON.stringify(response));
    });
});

server.listen(3000, () => {
  console.log('listening on port 3000');
});
