const socket = io();
const createGameBtn = document.getElementById("createGame");
createGameBtn.addEventListener("click", function(e) {
    socket.emit('create game');
});


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