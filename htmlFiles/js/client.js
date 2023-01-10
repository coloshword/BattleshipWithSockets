const socket = io(); 
let socket_room;    // THE SOCKET ROOM that the game occurs in(and hence joins)

var gameDisplay = (" \
<!DOCTYPE html>\
<html>\
<head>\
    <link rel=\"stylesheet\" href=\"css/gameStyle.css\"\
</head>\
<body>\
    <h1>GAME START</h1>\
    <p>This is battleship ahaha</p>\
    <div id=\"gridArea\"></div>\
    <button onclick=sendMsgServer();>send msg</button>\
    <script src=\"js/battleship.js\"></script>\
\
</body>\
</html> \
");

//Starting game
socket.on('startGame', function (result){
    document.write(gameDisplay);
});

function sendMsgServer() {
    socket.emit('ack', socket_room);
}

socket.on('msg', function(msgval){
    console.log(msgval);
})




//Front End Helper functions for the landing page 
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

// function to remove submit forms and to display game created message
function postSubmitDisplay() {
    // make forms disappear
    document.getElementById("createGamePopup").remove("open-popup");
    document.getElementById("joinGamePopup").remove("open-popup");
    // display game created message

    buttons = document.querySelectorAll('button');
    const transformedElements = Array.from(buttons).map(function(button) {
        return button.style.opacity = 0.5;
    });

    submitMsg = document.getElementById("postCreateGameMsg").innerHTML = "Game created, send the game room to someone else and have them join!";
    document.querySelector('.postCreateGameDisplay').style.display = 'block'; // make the post game create message appear
}


//Socket Helper functions
// param option -- 1 is create game, 2 is join game 
//called when client creates room or join rooms. Socket joins the room with form value
function joinSocketRoom(option) {
    let gameRoomVal;
    if(option == 1 ) {
        gameRoomVal = document.getElementById("createGameRoomID").value;// create game value
        if(gameRoomVal == undefined) {
            return;  // no game room was provided, so ignore
        }
        socket.emit("createGame", gameRoomVal);
        socket_room = gameRoomVal;
        postSubmitDisplay();
    }
    else {
        gameRoomVal = document.getElementById("joinGameRoomID").value; // join game room val 
        if(gameRoomVal == undefined) {
            return;  // no game room was provided, so ignore
        }
        socket.emit("joinRoom", gameRoomVal);
        socket_room = gameRoomVal;
    }
}