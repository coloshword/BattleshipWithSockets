const socket = io();
const createGameBtn = document.getElementById("createGame");
createGameBtn.addEventListener("click", function(e) {
    socket.emit('create game');
});