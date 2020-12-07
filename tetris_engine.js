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
    [2, width, width+1, width+2],
    [1, width+1, width*2+1, width*2+2],
    [width, width+1, width+2, width*2]
]

//'CW' L
const RTetratmino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [0, width, width+1, width+2]
    // [width, width+1, width]
  ]

  const TTetratmino = [
    [0, 1, 2, width +1],
    [2, width +1, width +2, width*2+2],
    [width +1, width*2, width *2_1, width*2+2],
    [0, width, width+1, width *2]
  ]

const ZTetramino = [
    [0, 1, width+1, width +2],
    [1, width, width+1, width*2],
    [0, 1, width+1, width +2],
    [1, width+1, width+2, width*2+2]
  ]
const STetramino = [
    [1, 2, width, width+1],
    [1, width, width+1, width*2]
  ]

const OTetramino = [
    [0,1,width, width+1],
    [0,1,width, width+1],
    [0,1,width, width+1],
    [0,1,width, width+1]
  ]

const ITetramino = [
    [0, 1, 2, 3],
    [0, width, width*2, width *3],
    [0, 1, 2, 3],
    [0, width, width*2, width *3]
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
    },interval*2)
  }

  // freeze()deprecated. Above added to delay freeze to allow 'final' movements before freezing.

  document.addEventListener('keydown',control)
}

//About to collide check

function freezeCheck(){
  return currentPiece.some( index=> squares[currentPosition + index + width].classList.contains('taken'))
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


// function freeze(){
//   if(currentPiece.some( index=> squares[currentPosition + index + width].classList.contains('taken'))){
//     clearInterval(timer)
//     setTimeout( ()=>{
//       timer = setInterval(moveDown, interval)
//       currentPiece.forEach(index=> squares[currentPosition + index].classList.add('taken'))
//
//       //spawn a new Tetramino
//       random = Math.floor(Math.random()*Tetraminoes.length)
//       currentPiece = Tetraminoes[random][currentRotation], interval
//       currentPosition = 4
//       draw()
//
//     }, 500)
//   }
// }

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
  currentPosition-=1
  draw()
}

function moveRight() {
  const isAtRightEdge = currentPiece.some(index => (currentPosition + index) % width === 9)
  if(isAtRightEdge) return
  if(currentPiece.some(index => squares[currentPosition + index+1].classList.contains('taken'))) return
  undraw()
  currentPosition += 1
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

}

document.addEventListener('keydown', control)

})
