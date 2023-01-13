function createGrid() {
    html = "<table id=\"grid\">\n";
    for(i=0; i<10;i++) {
        html += "<tr>";
        for(j=0; j<10;j++) {
            html+= `<td id=cell.${i}.${j} onclick="changeColor(${i}, ${j})"></td>`;
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
    <td id=oneShip draggable='true'></td>";
    const shipArea = document.getElementById('shipsArea');
    shipArea.innerHTML = html;
}

function changeColor(i, j) {
    // get the correct thing
    var cell = document.getElementById(`cell.${i}.${j}`);
    cell.classList.add("clickedBox");
    console.log(`${i} ${j}`);
}

gameLoopHTML = createGrid();
createDragableShips();