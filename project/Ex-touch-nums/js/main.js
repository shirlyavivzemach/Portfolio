'use strict'

var gBoard;
var gNextNum;
var level = 4
var gNums = insertNum();
var timeInterval;
var gTime;


function init() {
    gNums = insertNum();
    renderBoard(gBoard);
    gNextNum = 1;

}
function startGame() {
    gTime = Date.now();
    timeInterval = setInterval(gameTimer, 10);

}

function drawNum() {
    var randNum = getRandomInteger(0, gNums.length);
    var num = gNums.splice(randNum, 1);
    console.log(num);
    return num[0];
}

function insertNum() {
    var nums = [];
    for (var i = 1; i <= level ** 2; i++) {
        nums.push(i);
    }
    return nums;
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < level; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < level; j++) {
            var currNumCell = drawNum();
            strHTML += `\t<td onclick="clickNum(this)"> ${currNumCell}</td>
            \n`
        }
        strHTML += '</tr>\n'
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML

}

function clickNum(numCell) {
    var checkNum = +numCell.innerText
    if (gNextNum === 1 && checkNum === 1) {
        startGame()
    }
    if (gNextNum > 1 || checkNum === 1) {
        if (checkNum === gNextNum) {
            numCell.style.opacity = '60%'
            numCell.style.backgroundColor = 'rgb(122, 75, 122)';
            gNextNum++
            if (gNextNum > level ** 2) clearInterval(timeInterval)
        }

    }

}

function setLevel(elBtn) {
    var btnClassName = elBtn.className
    if (btnClassName === 'easy-level') {
        level = 4;
    } else if (btnClassName === 'medium-level') {
        level = 5;
    } else if (btnClassName === 'hard-level') {
        level = 6;
    }
    init()
}


function gameTimer() {
    var currTime = Date.now();
    var elLogTime = document.querySelector('.time-log');
    var timePassed = currTime - gTime;
    var timePassedSec = (timePassed / 1000).toFixed(3)
    elLogTime.innerText = `Time:${timePassedSec}`
}


function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

