const http = require('http');
const express = require('express');
const socketio = require('socket.io');


const PORT = process.env.PORT || 5000 ;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
io.on('connection', (socket)=>{

console.log('we have connection');
socket.on('join', ({ name ,room })=>{
    console.log(name, room);
});
socket.on('disconnect', ()=>{
    console.log('user left');
});






});

app.use(router);
server.listen( PORT, () => console.log(`Server has started on port ${PORT}`));