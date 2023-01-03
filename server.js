const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
//set static folder
app.use(express.static(path.join(__dirname, 'htmlFiles'))); // express uses the html folder 

let gameRooms = [];
let gameRoomsNumConnect = [];
let numGameRooms = 0;
let numconnections = 0;

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('createGame', (gameRoomVal) => {
    // create a game, add it to the list of gameRooms if it doesn't exist yet, then make the socket join the room 
    if(!gameRooms.includes(gameRoomVal)) {
      // if not included -- add it
      gameRooms[numGameRooms] = gameRoomVal;
      gameRoomsNumConnect[numGameRooms] = 1;
      numGameRooms++;
      socket.join(gameRoomVal);
    } else{
      console.log("this game already exists, please choose another");
    }
  })
  socket.on('joinRoom', (gameRoomVal) => {
    // see if the game room exists
    let gameRoomIndex = gameRooms.indexOf(gameRoomVal);
    if (gameRoomIndex == -1) { // game room doesn't exist
      // display in js
      console.log("game doesn't exist");
    }
    else { // game exists so join the socket if less than 2 people
      if (gameRoomsNumConnect[gameRoomIndex] < 2) {
        gameRoomsNumConnect[gameRoomIndex]++;
        socket.join(gameRoomVal); // connect this socket and start game event
        io.to(gameRoomVal).emit("startGame");
      } 
      else {
        // game iss full -- display in js
        console.log("this room is full already");
      }
    }
  })
  
});

server.listen(3000, () => {
  console.log('listening on localhost:3000');
});