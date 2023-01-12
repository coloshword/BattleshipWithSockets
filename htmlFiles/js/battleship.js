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

function changeColor(i, j) {
    //turn the color 
    //currentCell = document.getElementById(`cell.${i}.${j}`);
    console.log(`${i} ${j}`);
    //currentCell.classList.add("clickedBox");
}

gameLoopHTML = createGrid();
