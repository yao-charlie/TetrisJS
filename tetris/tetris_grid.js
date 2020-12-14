
var gridBlock = "";
var pieceBlock = "";
var rows = 20;
var columns = 10;
var i;
var j;

// for (i = 0; i < rows; i++){
//   gridBlock = gridBlock + "<div>";
//
//   for (j = 0; j < columns; j++){
//   gridBlock = gridBlock + "<div>" + i.toString() + "," + j.toString() + "</div>";
//   // gridBlock = gridBlock + "<div></div>";
//   };
//
//   gridBlock = gridBlock + "</div>";
// };


for (i = 0; i < rows*columns; i++){
  gridBlock += "<div></div>";
};

for (j=0;j<columns; j++){
  gridBlock += "<div class = 'taken'></div>"

}

for (k=0; k<columns*4; k++){
  pieceBlock += "<div></div>"
}

document.getElementById("tetris__grid").innerHTML = gridBlock;
document.getElementById("next__grid").innerHTML = pieceBlock;
