const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
//set static folder
app.use(express.static(path.join(__dirname, 'htmlFiles'))); // express uses the html folder 

var gameRooms = [];
var numGameRooms = 0;
var gameToStatusDict = {}; // started Gamess

io.on('connection', (socket) => {
  socket.on('createGame', (gameRoomVal) => {
    // create a game, add it to the list of gameRooms if it doesn't exist yet, then make the socket join the room 
    if(!gameRooms.includes(gameRoomVal)) {
      // if not included -- add it
      gameRooms[numGameRooms] = gameRoomVal;
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
      const clients = io.sockets.adapter.rooms.get(gameRoomVal);
      const numClients = clients ? clients.size : 0;
      if (numClients < 2) {
        gameToStatusDict[gameRoomVal] = 0;
        socket.join(gameRoomVal); // connect this socket and start game event
        io.to(gameRoomVal).emit("startGame");
      } 
      else {
        // game iss full -- display in js
        console.log("this room is full already");
      }
    }
  })

  socket.on('ack', (socket_room) => {
    const clients = io.sockets.adapter.rooms.get(socket_room);
    const numClients = clients ? clients.size : 0;
    console.log(numClients);
    console.log(socket.rooms);
    io.to(socket_room).emit('msg', "i got ur message, battleship client");
  })

  socket.on('shipsSetup', (socket_room) => {
    gameToStatusDict[socket_room]++;
    console.log(gameToStatusDict[socket_room]);
    if(gameToStatusDict[socket_room] == 2) { // we can start the game in clients 
      io.to(socket_room).emit('startGameLoop');
    }
  })
  
});

server.listen(3000, () => {
  console.log('listening on localhost:3000');
});