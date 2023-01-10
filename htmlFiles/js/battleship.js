function createGrid() {
    html = "<table id=\"grid\">";
    for(i=0; i<10;i++) {
        html += "<tr>";
        for(j=0; j<10;j++) {
            html+= "<td></td>";
        }
        html += "</tr>"
    }
    const gameArea = document.getElementById("gridArea");
    gameArea.innerHTML = html;
}

createGrid();