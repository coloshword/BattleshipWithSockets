// GLOBALS
var shipMoved = ''; // will be a string indicating which ship is the one being moved
var shipMovedAtIndex = -1; // Indicates which index cell is the one being dragged based on shipMoved

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
    // create the ships and make them html 
    html = "<table class='ship' id='1Ship' draggable='true' ondragstart='dragStart(event)'> \
    <td onmousedown='shipMovedAtIndex=0'></td>";
    html += "<table class='ship' id='4Ship' draggable='true' ondragstart='dragStart(event)'> \
    <td onmousedown='shipMovedAtIndex=0'></td><td onclick='onmousedown=1'></td><td onmousedown='shipMovedAtIndex=2'></td><td onmousedown='shipMovedAtIndex=3'></td>";
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