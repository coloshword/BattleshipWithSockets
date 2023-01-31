// game loop set up helper functions 
// your grids are id'ed ij 
// enemygrids will be marked eij 
function createGrid(isYou) {
    offset = '';
    if(!isYou) {
        offset = 'e';
    }
    html = "<table id=\"grid\">\n";
    for(i=0; i<10;i++) {
        html += "<tr>";
        for(j=0; j<10;j++) {
            html+= `<td class='cell' id='${offset}${j}${i}'></td>`;
        }
        html += "</tr>\n"
    }
    return html;
}

// function calls & gameLoop globals -- Setup 
document.getElementById("gridArea").innerHTML = createGrid(true);
document.getElementById("enemyGrid").innerHTML = createGrid(false);
console.log("this is running");