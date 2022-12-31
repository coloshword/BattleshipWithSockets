const socket = io();
const createGameBtn = document.getElementById("createGame");
createGameBtn.addEventListener("click", function(e) {
    socket.emit('create game');
});


function showPopup(option) {
    let popup;
    if(option == 1) {
        popup = document.getElementById("createGamePopup");
    }
    else{
        popup = document.getElementById("joinGamePopup");
    }
    popup.classList.add("open-popup");
}