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
let current = Tetraminoes[random][currentRotation]

//draw Tetramino as a map to CSS style.
function draw(){
  current.forEach(index =>{
    squares[currentPosition+index].classList.add('tetramino')
  })
}

//undraw Tetramino
function undraw(){
  current.forEach(index=>{
    squares[currentPosition+index].classList.remove('tetramino')
  })
}

draw()

// tetramino falling

var interval = 500; //timer in ms to start
timer = setInterval(moveDown, interval)

function moveDown(){
  undraw()
  currentPosition += width
  draw()
  freeze()
}


//freeze tetramino
function freeze(){
  if(current.some( index=> squares[currentPosition + index + width].classList.contains('taken'))){
    current.forEach(index=> squares[currentPosition + index].classList.add('taken'))
    //spawn a new Tetramino
    random = Math.floor(Math.random()*Tetraminoes.length)
    current = Tetraminoes[random][currentRotation]
    currentPosition = 4
    draw()
  }
}



})
