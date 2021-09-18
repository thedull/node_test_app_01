import { io } from "socket.io-client";

const socket = io("http://localhost:3000/");
socket.on('doge response', msg => console.log(msg));
socket.emit('doge request','{"first":10, "last":20}');
