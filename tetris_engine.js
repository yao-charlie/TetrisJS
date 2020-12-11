document.addEventListener('DOMContentLoaded', ()=>{
const grid = document.querySelector('.grid')
let squares = Array.from(document.querySelectorAll('.grid div'))
let nextSquares = Array.from(document.querySelectorAll('.nextTetra div'))

const displayScore = document.querySelector('#score')
const startButton = document.querySelector('#start__button')
const displaylastScored = document.querySelector('#last__score')
const gameOverDisplay = document.querySelector('#game__over')
const width = 10
const height = 20
const colours = ['teal', 'blue', 'orange', 'yellow', 'green', 'purple', 'red']
var gameTimer = null
var score = 0
var lost = false
var interval = 500 //gameTimer in ms to start


//tetraminoes
// N.B. - linear algebra could be used to rotate matricies instead

//TODO: Check centre of rotation issues for L, R, T

const iTetramino = [
    [width, width+1, width+2, width+3],
    [2, width+2, width*2+2, width*3+2],
    [width*2, width*2+1, width*2+2, width*2+3],
    [1, width+1, width*2+1, width*3+1]
  ]
const jTetratmino = [
    [0, width, width+1, width+2],
    [1, 2, width+1, width*2+1],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2]
  ]
const lTetramino = [
    [2, width, width+1, width+2],
    [1, width+1, width*2+1, width*2+2],
    [width, width+1, width+2, width*2],
    [0, 1, width+1, width*2+1]
]
const oTetramino = [
    [0,1,width, width+1],
    [0,1,width, width+1],
    [0,1,width, width+1],
    [0,1,width, width+1]
  ]
const sTetramino = [
    [1, 2, width, width+1],
    [1, width+1, width+2, width*2+2],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1]
  ]
const tTetratmino = [
    [1, width, width +1, width+2],
    [1, width +1, width +2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width +1, width*2+1]
  ]
const zTetramino = [
    [0, 1, width+1, width+2],
    [2, width+1, width+2, width*2+1],
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2]
  ]

const tetraminoes = [iTetramino, jTetratmino, lTetramino, oTetramino, sTetramino, tTetratmino, zTetramino]

const nextRotation = 0
//Spawn position
let currentPosition = 4
//First rotation
let currentRotation = 0

//randolmly select Tetramino
let nextRandom = Math.floor(Math.random()*tetraminoes.length)
var random = nextRandom
// let currentPiece = tetraminoes[random][currentRotation]


let currentPiece = null
let nextPiece = tetraminoes[nextRandom][currentRotation]
// currentPiece = nextPiece
assignNextPiece()
//
// var nextPiece = null

function assignNextPiece(){
  undrawNextPiece()
  currentPiece = nextPiece
  random = nextRandom
  nextRandom = Math.floor(Math.random()*tetraminoes.length)
  nextPiece = tetraminoes[nextRandom][nextRotation]
  drawNextPiece()
}

function drawNextPiece(){
if(gameTimer){
  nextPiece.forEach((index)=>{
    nextSquares[index].classList.add('tetramino')
    nextSquares[index].style.backgroundColor = colours[nextRandom]
  })

}
}
function undrawNextPiece(){
  nextPiece.forEach((index)=>{
    nextSquares[index].classList.remove('tetramino')
    nextSquares[index].style.backgroundColor = ''
  })
}

//draw Tetramino as a map to CSS style.
function draw(){
  currentPiece.forEach(index =>{
    squares[currentPosition+index].classList.add('tetramino')
    squares[currentPosition+index].style.backgroundColor = colours[random]
  })
}

//undraw Tetramino
function undraw(){
  currentPiece.forEach(index=>{
    squares[currentPosition+index].classList.remove('tetramino')
    squares[currentPosition+index].style.backgroundColor = ''
  })
}


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
// function completedLine(){
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

function completedLine(){
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
  score+=1
  moveScore = moveScore**2*10
  displaylastScored.innerHTML = moveScore + 1
  score = score + moveScore

}

function gameOver(){
  random = Math.floor(Math.random()*tetraminoes.length)
  assignNextPiece()
  currentPosition = 4
  if(currentPiece.some( index => squares[currentPosition + index].classList.contains('taken'))){
    clearInterval(gameTimer)
    gameOverDisplay.style.display = "block"

    lost = true
    gameTimer = null
    return lost
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

    completedLine()
    //spawn a new Tetramino

    displayScore.innerHTML = score
    return gameOver()
    // random = Math.floor(Math.random()*tetraminoes.length)
    // currentPiece = tetraminoes[random][currentRotation]
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
  // document.removeEventListener('keydown',control)
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
  // document.addEventListener('keydown',control)
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
//   currentPiece = tetraminoes[random][currentRotation]
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
  currentPiece = tetraminoes[random][currentRotation]
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
  if (key.keyCode === 32){
    while(!freezeCheck()) moveDown()
  }

}


function start(){
  document.getElementById("start__button").blur()
  if(gameTimer){
    clearInterval(gameTimer)
    gameTimer = null
    document.removeEventListener('keydown', control)
  }

  else{
    if(lost){
      for(i=0; i<height*width; i++){
        squares[i].classList.remove("taken")
        squares[i].classList.remove("tetramino")
      }
      score = 0
      lost = false
      displaylastScored.innerHTML = 0
      displayScore.innerHTML = 0
      gameOverDisplay.style.display = "none"
    }
    document.addEventListener('keydown', control)
    draw();
    gameTimer = setInterval(moveDown, interval)
    drawNextPiece()
  }
}

// function startEnter(key){
//   if(key.keyCode === 13){
//     start()
//   }
// }

startButton.addEventListener('mousedown', start)
// document.addEventListener('keydown', startEnter)

})
