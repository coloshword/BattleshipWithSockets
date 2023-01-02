const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
//set static folder
app.use(express.static(path.join(__dirname, 'htmlFiles'))); // express uses the html folder 

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinEvent', (gameRoomVal) => {
    console.log("joining game room")
    socket.join(gameRoomVal);
  })
  
});

server.listen(3000, () => {
  console.log('listening on localhost:3000');
});

