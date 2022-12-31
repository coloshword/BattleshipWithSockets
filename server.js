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
  socket.on('create game', (value) => {  // socket.on requires a value to be passed, even if the emit event doesn't emit a value    
    console.log("game created");
  });  
});

server.listen(3000, () => {
  console.log('listening on localhost:3000');
});

