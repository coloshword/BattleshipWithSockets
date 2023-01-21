// GLOBALS
var shipMoved = ''; // will be a string indicating which ship is the one being moved
var shipMovedAtIndex = -1; // Indicates which index cell is the one being dragged based on shipMoved
const numS = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];

function createGrid() {
    html = "<table id=\"grid\">\n";
    for(i=0; i<10;i++) {
        html += "<tr>";
        for(j=0; j<10;j++) {
            html+= `<td class='cell' id='cell.${i}.${j}' ondragover='onDragOver(event)' ondrop='onDragEnd(event)'></td>`;
        }
        html += "</tr>\n"
    }
    const gameArea = document.getElementById("gridArea");
    gameArea.innerHTML = html;
    console.log(html);
    return html;
}

function createDragableShips() {
    html = "";
    let shipSize = 1;
    let numShipsPerSize = 4;
    for(let numTypeShips = 0; numTypeShips < 4; numTypeShips++) {
        for(let i = numShipsPerSize; i > 0; i--) {
            html += `<table class='ship' id='${shipSize}Ship${i}' draggable='true' ondragstart='dragStart(event)'><br>`
            for(let numcells=0; numcells < shipSize; numcells++) {
                html += `<td onmousedown='shipMovedAtIndex=${numcells}'></td>`
            }
        }
        shipSize++;
        numShipsPerSize--;
    }
    const shipArea = document.getElementById('shipsArea');
    shipArea.innerHTML = html;
}

// drag events 
function dragStart(event) {
    console.log("being dragged");
    shipMoved = document.getElementById(event.target.id);
    console.log(shipMovedAtIndex);
    event.dataTransfer.setData("text", event.target.id);
}

function onDragOver(event) {
    event.preventDefault();
}

function onDragEnd(event) {
    console.log(event.target.id);
    droppedShip = document.getElementById(event.dataTransfer.getData("text")); // the original ship needs to remove draggable
    droppedShip.draggable = false; 
    droppedShip.classList.remove('ship');
    droppedShip.classList.add('formerShip');
    dropLocation = document.getElementById(event.target.id);
    dropLocation.classList.add('ship'); // it is a cell and it is a ship 
}

// used to update the lastmoved index for ship
function lastMoved(x) {
    console.log("updating");
    shipMovedAtIndex = x;
}

gameLoopHTML = createGrid();
createDragableShips();