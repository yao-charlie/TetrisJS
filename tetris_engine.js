document.addEventListener('DOMContentLoaded', ()=>{
const grid = document.querySelector('.grid')
let squares = Array.from(document.querySelectorAll('.grid div'))

const DisplayScore = document.querySelector('#score')
const StartButton = document.querySelector('#start__button')
const width = 10


//Tetraminoes

//TODO: Check centre of rotation issues for L, R, T
const LTetramino = [
    [0, 1, width+1, width*2+1],
    [width+2, width*2, width*2+1, width*2+2],
    [1, width+1, width*2+1, width*2+2],
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
    [1, width+1, width+2, width*2+2]
  ]
const STetramino = [
    [width+1, width+2, width*2, width*2+1],
    [1, width, width+1, width*2],
    [width+1, width+2, width*2, width*2+1],
    [1, width, width+1, width*2]
  ]

const OTetramino = [
    [0,1,width, width+1],
    [0,1,width, width+1],
    [0,1,width, width+1],
    [0,1,width, width+1]
  ]

const ITetramino = [
    [1, width+1, width*2+1, width *3+1],
    [width*4, width*4+1, width*4+2, width*4+3],
    [1, width+1, width*2+1, width *3+1],
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

draw()

// tetramino falling

var interval = 200 //timer in ms to start
timer = setInterval(moveDown, interval)


//TODO: Collision bug... moveLeft/moveRight fires while moveDown is activating,
//      allowing tetramino to mome to adjacent block before logic checks to freeze.
//      "suspending" EventListner does not seem to solve this...

function moveDown(){
  document.removeEventListener('keydown',control)
  undraw()
  currentPosition += width
  draw()

  if(freezeCheck()){
    clearInterval(timer)
    setTimeout(()=>{
      freeze()
      timer=setInterval(moveDown,interval)
    },interval*2) //times 2 for more 'natural' feel
  }

  // freeze()deprecated. Above added to delay freeze to allow 'final' movements before freezing.

  document.addEventListener('keydown',control)
}

//collision detection

//bottom/pieces
function freezeCheck(){
  return currentPiece.some( index=> squares[currentPosition + index + width].classList.contains('taken'))
}

//not used yet but will need for rotating. Bugged
function wallCheck(){
  if(currentPiece.some(index => (currentPosition + index) % width === width - 1)) return True
  if(currentPiece.some(index => (currentPosition + index) % width === 0)) return True
  return False
}

// freeze tetramino
function freeze(){
  if(freezeCheck()){

    currentPiece.forEach(index=> squares[currentPosition + index].classList.add('taken'))
    //spawn a new Tetramino
    random = Math.floor(Math.random()*Tetraminoes.length)
    currentPiece = Tetraminoes[random][currentRotation], interval
    currentPosition = 4
    draw()
  }
}



//moving Tetramino

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




function moveLeft() {
  const isAtLeftEdge = currentPiece.some(index => (currentPosition + index) % width === 0)
  if(isAtLeftEdge) return
  if(currentPiece.some(index => squares[currentPosition + index-1].classList.contains('taken'))) return
  undraw()
  currentPosition--
  draw()
}

function moveRight() {
  const isAtRightEdge = currentPiece.some(index => (currentPosition + index) % width === width - 1)
  if(isAtRightEdge) return
  if(currentPiece.some(index => squares[currentPosition + index+1].classList.contains('taken'))) return
  undraw()
  currentPosition++
  draw()
}


function rotate(){
  currentRotation++
  currentRotation%=4
  undraw()
  currentPiece = Tetraminoes[random][currentRotation]
  draw()
  }

//keys to movement

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
