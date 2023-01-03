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
    // let gameRoomIndex = gameRooms.indexOf(gameRoomVal);
    // if(gameRoomIndex == -1) {
    //   // it doesn't exist so we add to the array
    //   gameRooms[numGameRooms] = gameRoomVal;
    //   gameRoomsNumConnect[numGameRooms] = 1;
    //   numGameRooms++;
    //   socket.join(gameRoomVal);
    // }
    // else {
    //   // it exists to we have to see how many people are currently connected
    //   if(gameRoomsNumConnect[gameRoomIndex] < 2) {
    //     // we can connect another person
    //     gameRoomsNumConnect[gameRoomIndex]++;
    //     // game starts in this room
    //     socket.join(gameRoomVal);
    //     io.to(gameRoomVal).emit("startGame");
    //     console.log("Starting a game");
    //   }
    //   else {
    //     console.log("this room is full already");
    //   }
    // }
    // for(let i = 0; i < gameRooms.length; i++) {
    //   console.log(gameRooms[i]);
    // }
  
});

server.listen(3000, () => {
  console.log('listening on localhost:3000');
});
