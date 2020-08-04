'use strict'
// @CR: Hey shirly! first of all, very nice project, your code is very readable and short, very good variable and function names!
// @CR: Try to better your indentation (ctrl+shift+f), correct spacing between stuff
// @CR: look for my notes throughout the code, they all start with "@CR" :)
var FLAG = '🚩'
var MINES = '💣'
var WIN = ' 😎'
var LOSE = '🤯'
var NORMAL = '🤩'
var gMinesCounter = 0 // @CR: this can be part of the gGame object
var gStartGame = false // @CR: this can be part of the gGame object
var firstClick = false // @CR: Naming, gFirstClick, or put it inside the gGame object is even better
var GAMEOVER = false // @CR: this can be part of the gGame object, the isOn property is the same but you dont use it
var timeInterval; // @CR: Naming, gTimeInterval
var gTime;

var gBoard = {

}

var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame = {
    isOn: false, // @CR: you are not using this, better to delete it
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isWin: false // @CR: you are not using this, better to delete it
}


function initGame() {
    GAMEOVER = false
    gGame.isOn = true
    firstClick = false

    gBoard = buildBoard();
    renderBoard(gBoard);
    stop() // @CR
    // var elHappy=document.querySelector('.Start');
    // elHappy.innerText=NORMAL;

}

function startGame() {
    if (GAMEOVER) return
    gGame.isOn = true
    stop()
    gTime = Date.now();
    timeInterval = setInterval(gameTimer, 10);
}


// Builds the board   Set mines at random locations Call setMinesNegsCount() Return the created board 
function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    gBoard = board; // @CR: no need to do this, at line 38 you do the same
    return board;
}

// Render the board as a <table> to the page
function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>\n';

        for (var j = 0; j < gLevel.SIZE; j++) {
            var currCell = board[i][j]
            var id = `${'r' + i + 'c' + j}`
            var cellColor = renderCellContent(currCell) === '-' ? "grey" : "transparent";
            strHTML += `\t<td id=${id} style="background-color:${cellColor}" onmousedown="cellMarked(${i},${j})" onclick="cellClicked(${id}, ${i},${j})">${renderCellContent(currCell, id)} </td>
            \n`;
        }
        strHTML += '</tr>\n';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function getCellMinesCount(cellI, cellJ, board) {
    var startIdxI = cellI - 1;
    var endIdxI = cellI + 1;
    var startIdxJ = cellJ - 1;
    var endIdxJ = cellJ + 1;
    var countMines = 0;
    // @CR: this is not the way we write a neg loop, you should check if the i or j are out of bounds, inside the loop
    /*
    for (var i = startIdxI; i <= endIdxI; i++) {
        if(i<0 || i>=board.length) continue
        for (var j = startIdxJ; j <= endIdxJ; j++) {
            if(j<0 || j>=board.length) continue
                if (i !== cellI || j !== cellJ) {
                    if (board[i][j].isMine) {
                        countMines++;
                    }
                }
            }
        }
    */
    if (cellI === 0) startIdxI = cellI;
    else if (cellI === gLevel.SIZE - 1) endIdxI = cellI;
    if (cellJ === 0) startIdxJ = cellJ;
    else if (cellJ === gLevel.SIZE - 1) endIdxJ = cellJ;

    for (var i = startIdxI; i <= endIdxI; i++) {

        for (var j = startIdxJ; j <= endIdxJ; j++) {
            if (i !== cellI || j !== cellJ) {

                if (board[i][j].isMine) {
                    countMines++;


                    // @CR: what is all this space :)) makes the code look longer and less readable, watch out for it
                }
            }
        }
    }
    return countMines;
}


// Count mines around each cell and set the cell's minesAroundCount. 

function setMinesNegsCount(board) {

    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (board[i][j] !== MINES) {
                board[i][j].minesAroundCount = getCellMinesCount(i, j, board);
            }
        }
    }
    renderBoard(board);
}


// Called when a cell (td) is clicked 
function cellClicked(i, j) {
    if (GAMEOVER) return
    var cell;
    if (gBoard[i][j].isMine) {
        gBoard[i][j].isShown = true;
        renderBoard(gBoard); // @CR: why call render board here if you are calling it at the end of the func?


        checkGameOver()

    }

    if (gBoard[i][j] !== MINES && !GAMEOVER) { // @CR: no need to check game over, you did it at line 153
        gBoard[i][j].isShown = true;
        renderBoard(gBoard); // @CR: why call render board here if you are calling it at the end of the func anyways?
        cell = gBoard[i][j];
    }
    else if (gBoard[i][j].isMine === true) { // @CR: no need for "===true", you can just if (gBoard[i][j].isMine === true)
        gBoard[i][j].isShown = false;
        gGame.isOn = false
        gGame.isWin = false
    }
    if (!firstClick) { // @CR: this condition is a bit confusing, if firstClick === false then we are now doing the first click
        // @CR: thats why you should call it "isFirstClick", then if its true, it is pretty obvious we are in first click
        expandShown(gBoard, cell, i, j)
        setMines()
        setMinesNegsCount(gBoard)
        startGame()
    }

    firstClick = true
    renderBoard(gBoard)
}



function setMines() {

    switch (gLevel.SIZE) {
        case gLevel.SIZE === 4:
            gLevel.MINES = 2;
            break;
        case gLevel.SIZE === 8:
            gLevel.MINES = 12;
            break;
        case gLevel.SIZE === 12:
            gLevel.MINES = 30
            break;
    }
    var cnt = 0
    // @CR: Always a better tactic here to get an array with all the empty positionm and then get some random indexes from that array
    // @CR: remember, DRY - Dont Repeat Yourself :) 
    for (var i = 0; i < gLevel.MINES; i++) {
        var posI = getRandomInteger(0, gLevel.SIZE);
        var posJ = getRandomInteger(0, gLevel.SIZE);
        if (gBoard[posI][posJ].isShown === false) {
            if (cnt < gLevel.MINES) {
                gBoard[posI][posJ].isMine = true
                cnt++
            }

        } else {
            while (gBoard[posI][posJ].isShown === true) {

                posI = getRandomInteger(0, gLevel.SIZE);
                posJ = getRandomInteger(0, gLevel.SIZE);
                if (gBoard[posI][posJ].isShown === false) {
                    if (cnt < gLevel.MINES) {
                        gBoard[posI][posJ].isMine = true
                        cnt++
                    }
                }
            }
        }

    }

    renderBoard(gBoard)
}


function renderCellContent(cell, id) { // @CR: Naming! this does not render anything, it receives a cell and returns a string, call it getCellContent
    if (cell.isShown) {
        if (cell.isMine) return MINES;
        if (cell.minesAroundCount === 0) {

            return '-'
        }

        else {
            return cell.minesAroundCount
        }
    }
    if (cell.isMarked) return FLAG

    return ''
}

function cellMarked(i, j) {
    checkWin() // @CR: You should check for win after you put the flag

    //prevent menu apear on right click event
    document.addEventListener('contextmenu', event => event.preventDefault())
    var e = window.event;
    var rightClick = e.button == 2

    if (rightClick)
        gBoard[i][j].isMarked = true
    else {
        cellClicked(i, j)
    }

    renderBoard(gBoard)

}



function expandShown(board, cell, i, j) {
    getNeighbors(cell, i, j, board)
}


function getNeighbors(currCell, cellI, cellJ, board) { // @CR: Naming! this func dosent return anything, so its more of a "showNeighbors"
    var startIdxI = cellI - 1;
    var endIdxI = cellI + 1;
    var startIdxJ = cellJ - 1;
    var endIdxJ = cellJ + 1;

    if (cellI === 0) startIdxI = cellI;
    else if (cellI === gLevel.SIZE - 1) endIdxI = cellI;
    if (cellJ === 0) startIdxJ = cellJ
    else if (cellJ === gLevel.SIZE - 1) endIdxJ = cellJ;

    for (var i = startIdxI; i <= endIdxI; i++) {
        for (var j = startIdxJ; j <= endIdxJ; j++) {
            board[i][j].isShown = true;
        }
    }
}
// Game ends when all mines are marked, and all the other cells are shown
function checkGameOver() {
    // @CR: watch out for these 3 vars, they all do the same thing and you only use 1 of them
    GAMEOVER = true;
    gGame.isWin = false;
    gGame.isOn = false;
    stop()

    //open the board 
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            gBoard[i][j].isShown = true;
        }
    }
    alert("Game over!");

}

function checkWin() {
    var cnt = 1;
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (gBoard[i][j].isShown === true || gBoard[i][j].isMarked) {
                cnt++
            }
        }
    }
    if (cnt === gLevel.SIZE * gLevel.SIZE) {
        alert('You Won!');
        stop()
    }
}

function setLevel(elBtn) {
    var btnClassName = elBtn.className
    if (btnClassName === 'levels easy-level') {
        gLevel.SIZE = 4;
        gLevel.MINES = 2;
    } else if (btnClassName === 'levels medium-level') {
        gLevel.SIZE = 8;
        gLevel.MINES = 12;
    } else if (btnClassName === 'levels hard-level') {
        gLevel.SIZE = 12;
        gLevel.MINES = 30;
    }

    stop()
    initGame()

}


function gameTimer() {
    var currTime = Date.now();
    var elLogTime = document.querySelector('.time-log');
    var timePassed = currTime - gTime;
    var timePassedSec = (timePassed / 1000).toFixed(3)
    elLogTime.innerText = `Time:${timePassedSec}`
}

function stop() { // @CR: Naming! what are we stopping? stopGame / endGame
    gGame.isOn = false;
    clearInterval(timeInterval);

}

