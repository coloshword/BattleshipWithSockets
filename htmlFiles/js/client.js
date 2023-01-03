const socket = io();

// client socket events
// socket.on("startGame"), (arg) => {
//     console.log("game started");
// }
socket.on('startGame', function (result){
    window.location.href = "gameLoop.html";
});


//Helper functions
function showPopup(option) {
    let popup;
    let remove;
    if(option == 1) {
        popup = document.getElementById("createGamePopup");
        remove = document.getElementById("joinGamePopup");
    }
    else{
        popup = document.getElementById("joinGamePopup");
        remove = document.getElementById("createGamePopup");
    }
    popup.classList.add("open-popup");
    remove.classList.remove("open-popup");
}

// param option -- 1 is create game, 2 is join game 
//called when client creates room or join rooms. Socket joins the room with form value
function joinSocketRoom(option) {
    let gameRoomVal;
    if(option == 1 ) {
        gameRoomVal = document.getElementById("createGameRoomID").value;// create game value
        socket.emit("createGame", gameRoomVal);
    }
    else {
        gameRoomVal = document.getElementById("joinGameRoomID").value; // join game room val 
        socket.emit("joinRoom", gameRoomVal);
    }
}
