document.addEventListener('DOMContentLoaded', ()=>{
const grid = document.querySelector('.grid')
let squares = Array.from(document.querySelectorAll('.grid div'))

const DisplayScore = document.querySelector('#score')
const StartButton = document.querySelector('#start__button')
const width = 10
const height = 20
var score = 0


//Tetraminoes
// N.B. - linear algebra could be used to rotate matricies instead

//TODO: Check centre of rotation issues for L, R, T
//TODO:revise tetraminoes to follow super rotation system as the current Tetris Guideline
const LTetramino = [
    [0, 1, width+1, width*2+1],
    [width+2, width*2, width*2+1, width*2+2],
    [0, width, width*2, width*2+1],
    [width, width+1, width+2, width*2]
]

//'CW' L
const RTetratmino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
    // [width, width+1, width]
  ]

const TTetratmino = [
    [width, width+1, width+2, width*2+1],
    [2, width+1, width+2, width*2+2],
    [width+1, width*2, width *2+1, width*2+2],
    [0, width, width+1, width *2]
  ]

const ZTetramino = [
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2],
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2]
  ]
const STetramino = [
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1]
  ]

const OTetramino = [
    [0,1,width, width+1],
    [0,1,width, width+1],
    [0,1,width, width+1],
    [0,1,width, width+1]
  ]

const ITetramino = [
    [0, width, width*2, width*3],
    [width*4, width*4+1, width*4+2, width*4+3],
    [0, width, width*2, width*3],
    [width*4, width*4+1, width*4+2, width*4+3]
  ]

const Tetraminoes = [LTetramino, RTetratmino, TTetratmino, ZTetramino, STetramino, OTetramino, ITetramino]

//Spawn position
let currentPosition = 4
//First rotation
let currentRotation = 0

//randolmly select Tetramino
let random = Math.floor(Math.random()*Tetraminoes.length)
let currentPiece = Tetraminoes[random][currentRotation]

//draw Tetramino as a map to CSS style.
function draw(){
  currentPiece.forEach(index =>{
    squares[currentPosition+index].classList.add('tetramino')
  })
}

//undraw Tetramino
function undraw(){
  currentPiece.forEach(index=>{
    squares[currentPosition+index].classList.remove('tetramino')
  })
}

//initialize
draw()

// tetramino falling

var interval = 500 //gameTimer in ms to start
var gameTimer = setInterval(moveDown, interval)



//Collision Detection

//bottom/pieces
function freezeCheck(){
  return currentPiece.some( index => squares[currentPosition + index + width].classList.contains('taken'))
}


function leftCheck(){
  if(currentPiece.some( index => (currentPosition + index) % width === 0)) return true //wall
  if(currentPiece.some( index => squares[currentPosition + index - 1].classList.contains('taken'))) return true //piece
  return false
}

function rightCheck(){
  if(currentPiece.some( index => (currentPosition + index) % width === width - 1)) return true //wall
  if(currentPiece.some( index => squares[currentPosition + index + 1].classList.contains('taken'))) return true //piece
  return false
}

function rightSide(){
  if(currentPiece.every(index => (currentPosition + index) % width > 5)) return true
  return false
}

function leftSide(){
  if(currentPiece.every(index => (currentPosition + index) % width < 4)) return true
  return false
}

//Broken code to be revisited:

// function rowCompleted(currentRow){
//   for(k=0; k<width; k++){
//     console.log("k is " + k)
//     var foo = k=>squares[k+currentRow*width].classList.contains('taken')
//     console.log(foo)
//     // if(!(currentRow=>squares[checkIndex+j+currentRow*width].classList.contains('taken'))) return false
//   }
//   return true
// }
//
// // Scoring
//
// function scoreUp(){
//   // console.log("current Postion is" + currentPosition)
//   let checkIndex = currentPosition - currentPosition%width
//   // console.log("check index is " + checkIndex)
//   let rowsCompleted = 0
//   let pieceScore = 0
//
//   for(i = 0; i<6 ; i++){ //4 is max number of rows possible to make or should be but I seems bugged
//     if (i * width + checkIndex > width * height) {break}
//     if (rowCompleted(checkIndex)) {
//       pieceScore++
//       // console.log(pieceScore)
//     }
//   }
//
// }

function scoreUp(){
  // let checkIndex = currentPosition - currentPosition%width
  // for (i=checkIndex; (i < width*height) || (i < (checkIndex + 6*width)); i+=width){
  let moveScore = 0
  for (i=0; i < width*height; i+=width){
    var row = []
    for (j=0; j<width; j++) {
      row.push(i+j)
    }

    if(row.every(index => squares[index].classList.contains('taken'))){
      moveScore += 1
      row.forEach(index=>{
        squares[index].classList.remove('taken')
        squares[index].classList.remove('tetramino')
        squares[index].style.backgroundColor=''
      })
      const squaresRemoved = squares.splice(i, width)
      squares = squaresRemoved.concat(squares)
      squares.forEach(cell=>grid.appendChild(cell))

    }
  }
  score = score + moveScore ** 2
  console.log("score is " + score)
}

function gameOver(){
  random = Math.floor(Math.random()*Tetraminoes.length)
  currentPiece = Tetraminoes[random][currentRotation]
  currentPosition = 4
  if(currentPiece.some( index => squares[currentPosition + index].classList.contains('taken'))){
    clearInterval(gameTimer)
    console.log("Game Over")
    return true
  }
  else {
    draw()
    return false
  }
}



// Freeze tetramino
function freeze(){
  if(freezeCheck()){

    currentPiece.forEach(index => squares[currentPosition + index].classList.add('taken'))

    scoreUp()
    //spawn a new Tetramino
    return gameOver()
    // random = Math.floor(Math.random()*Tetraminoes.length)
    // currentPiece = Tetraminoes[random][currentRotation]
    // currentPosition = 4
  }
}





//Moving Tetramino

// Alternate move:
// function moveLeft() {
//   undraw()
//   const isAtLeftEdge = currentPiece.some(index => (currentPosition + index) % width === 0)
//   if(!isAtLeftEdge) currentPosition -= 1
//   if(currentPiece.some(index => squares[currentPosition + index].classList.contains('taken'))){
//     currentPosition += 1
//   }
//   draw()
// }

function moveDown(){
  document.removeEventListener('keydown',control)
  if(freezeCheck()){
    clearInterval(gameTimer)
    setTimeout(()=>{
      if(!freeze()) gameTimer = setInterval(moveDown,interval)


    },interval*2) //times 2 for more 'natural' feel
    return
  }
  undraw()
  currentPosition += width
  draw()
  //might use for moveLeft/Right but seems to still be bugged.
  document.addEventListener('keydown',control)
}

function moveLeft() {
  if(leftCheck()) return;
  undraw()
  currentPosition--
  draw()
}

function moveRight() {
  if(rightCheck()) return;
  undraw()
  currentPosition++
  draw()
}

// function rotate(){
//   currentRotation++
//   currentRotation%=4
//   undraw()
//   currentPiece = Tetraminoes[random][currentRotation]
//   //N.B. This might introduce 'wall kick' behaviour.
//   if(rightCheck()){
//     while(rightCheck()) {
//       currentPosition--
//     }
//     currentPosition++ //needed since rightCheck will cause this loop to always run once
//   }
//   else if(leftCheck()){
//     while(leftCheck()) {
//       currentPosition++
//     }
//     currentPosition-- //needed since leftCheck will cause this loop to always run once
//   }
//   draw()
// }

//no kick
function rotate(){
  placeholderPiece = currentPiece
  currentRotation++
  currentRotation%=4
  undraw()
  currentPiece = Tetraminoes[random][currentRotation]
  if(rightCheck() && leftCheck() ){
    currentRotation--
    currentRotation+=width
    currentRotation%=4
    currentPiece = placeholderPiece
  }
  draw()
}

//Keys to movement

function control(key){
  if (key.keyCode === 37){
    moveLeft()
    }
  if (key.keyCode === 39){
    moveRight()
  }
  if (key.keyCode === 40){
    if(!freezeCheck()) moveDown() //freezeCheck() needed to prevent move firing before the moveDown freezeCheck fires.
  }
  if (key.keyCode === 38){
    if(!freezeCheck()) rotate()
  }
}

document.addEventListener('keydown', control)

})
