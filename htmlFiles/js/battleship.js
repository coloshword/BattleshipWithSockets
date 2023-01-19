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
    html = "<table id='ship'> \
    <td class='ship' id=1Ship draggable='true' ondragstart='dragStart(event)' =></td>";
    const shipArea = document.getElementById('shipsArea');
    shipArea.innerHTML = html;
}

// drag events 
function dragStart(event) {
    console.log("being dragged");
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
    dropLocation.classList.add('ship');
}

gameLoopHTML = createGrid();
createDragableShips();