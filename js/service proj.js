'use strict'

// const gNameProjects=['Touch The Nums','Pacmen','MineSweeper','Ballboard','Book Shop']
const KEY = 'projects';
var gProjects;

createProjects();

function createProject(name,url,img,desc){
    return{
        id: makeId(), 
        name: name,
        img:img,
        desc:desc,
        url: url,
        publishedAt: Date.now()

    }

}

function createProjects(){
    gProjects=[];
    gProjects.push(createProject('Touch The Nums','project/Ex-touch-nums/index.html','img/portfolio/touchthenums.jpg','Check how faster you are? \nclick the buttons in a sequence (1, 2, 3,… 16) and start play!'));
    gProjects.push(createProject('Pacmen','project/pacman-starter/index.html','img/portfolio/pacman.jpg','Guide Pacman around the maze and eat all the little white dots whilst avoiding those nasty ghosts. If you eat a Power Pill, you can eat the ghosts! Occasionally, a fruit appears which gives you a bonus score when eaten.'));
    gProjects.push(createProject('MineSweeper','project/minesweeper/index.html','img/portfolio/minesweeper.jpg','Minesweeper is a single-player puzzle video game. The objective of the game is to clear a rectangular board containing hidden "mines" or bombs without detonating any of them, with help from clues about the number of neighboring mines in each field'));
    gProjects.push(createProject('Ballboard','project/ball-board-start-here/index.html','img/portfolio/ball.jpg','In this game you should collects all balls on the bord, Lets begin the fun!!!'));
    gProjects.push(createProject('Book Shop','project/bookShop/index.html','img/portfolio/library.jpg','Nice managment application that manage your liabrary'));
    
}


function getProjectById(projectId) {
    var project = gProjects.find(function (project) {
        return projectId === project.id
    })
    return project
}

function getProjects(){

    return gProjects

}













function getProjects(){
    return gProjects
}


