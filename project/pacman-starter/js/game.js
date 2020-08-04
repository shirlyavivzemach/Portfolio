'use strict';
const WALL = '🧱';
const FOOD = '🍭';
const EMPTY = ' ';
var gFoodOnBoard = 0
var POWERFOOD = '🎂'
var CHERRY = '🍒'
var gIntervalCherry;

var gBoard;
var gGame = {
  score: 0,
  isOn: false
};

function init() {
  gFoodOnBoard = 0;
  gGame.score = 0;
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');

  gGame.isOn = true;
  gIntervalCherry=setInterval(addCherry,5000) 

}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gFoodOnBoard++

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
        gFoodOnBoard--
      }
      if (i === 1 && j === 1 || i === SIZE - 2 && j === 1 ||
        i === 1 && j === SIZE - 2 || i === SIZE - 2 && j === SIZE - 2) {
        board[i][j] = POWERFOOD
        gFoodOnBoard--

      }

    }

  }
  // board[1][1]=POWERFOOD
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}


function gameOver(isWin) {
  var elMsg = document.querySelector('.modal h3')
  elMsg.innerText = isWin ? 'Win!' : 'Game Over!!!'

  setTimeout(function () {
    elMsg.innerText = ''
  }, 3000)
  openModal()
  gGame.isOn = false;

  clearInterval(gIntervalGhosts);

  gIntervalGhosts = null;


}

function openModal() {

  var elModal = document.querySelector('.modal')
  elModal.style.display = 'block'

}
function checkWin() {
  if (gFoodOnBoard === 0) {
    gameOver(true)
  }
  console.log(gFoodOnBoard)
}

function getEmpty() {
  var empty = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      var currCell = gBoard[i][j];
      if (currCell === EMPTY) {
        empty.push({ i: i, j: j });
      }
    }
  }
  
  return empty

}


function addCherry() {
  if(gGame.score>1){
  
  var emptyCell = getEmpty();
  var randI = getRandomIntInclusive(0, emptyCell.length - 1)
  var cherryPlace = emptyCell[randI]
  gBoard[cherryPlace.i][cherryPlace.j] = CHERRY
  renderCell(cherryPlace, CHERRY)
  setTimeout(function () {
    gBoard[cherryPlace.i][cherryPlace.j] = EMPTY
    renderCell(cherryPlace, EMPTY)
  }, 15000);

}
}





