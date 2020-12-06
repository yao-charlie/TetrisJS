
var codeBlock = "";
var rows = 20;
var columns = 10;
var i;
var j;

// for (i = 0; i < rows; i++){
//   codeBlock = codeBlock + "<div>";
//
//   for (j = 0; j < columns; j++){
//   codeBlock = codeBlock + "<div>" + i.toString() + "," + j.toString() + "</div>";
//   // codeBlock = codeBlock + "<div></div>";
//   };
//
//   codeBlock = codeBlock + "</div>";
// };


for (i = 0; i < rows*columns; i++){
  codeBlock = codeBlock + "<div></div>";
};

document.getElementById("tetris_grid").innerHTML = codeBlock;
