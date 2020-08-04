'use strict'

$(document).ready(onInit)

function onInit() {
    renderProjects()
    
}

function renderProjects() {
    var projects = getProjects()
    console.log(projects);
    var strHtmls = projects.map(function (project) {
        return `
      <div class="col-md-4 col-sm-6 portfolio-item">
      <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onClick="onRenderProject(${project.id})">
        <div class="portfolio-hover">
          <div class="portfolio-hover-content">
            <i class="fa fa-plus fa-3x"></i>
          </div>
        </div>
        <img class="img-fluid" src="${project.img}" alt="">
      </a>
      <div class="portfolio-caption">
        <h4>${project.name}</h4>
      </div>
    </div>
    `
    })
    document.querySelector('#portfolio .container .row').innerHTML = strHtmls.join('')
}


function onRenderProject(projectId) {
    var project = getProjectById(projectId);
    var strHTML = `
    <h2>${project.name}</h2>
    <img class="img-fluid d-block mx-auto" src="${project.img}" alt="">
    <p>${project.desc}</p>
    <ul class="list-inline">
    <li>${new Date(project.publishedAt).toLocaleString()}</li>
    
    </ul>
    <a href= "${project.url}" target="blank">
    <button class="btn btn-primary" type="button" >
    <i class="fa fa-times"></i>
    Check it out!</button></a>
    `
    var elModal = document.querySelector('.modal-body')
  
   elModal.innerHTML = strHTML
}


    $('#contact').on('submit', function (e) {
        var massage = $('#content').val()
        var subject = $('#subject').val()
    
        var url = `https://mail.google.com/mail/?view=cm&fs=1&to=shirly1986@gmail.com&su=${subject}&body=${massage}`
        window.open(url)
        return false
    });
    







//   var email=$('#email').val(); 
//   var subject=$('#subject').val();
//   var subject=$('#content').val();
  
// var strHTML = `
// <a href "https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${content}"
// target="blank">
// <button class="btn btn-primary"
// type="button">
// onclick="onRestartForm()">
// submit
// </button>
// </a>
// `
// // var elForm=document.querySelector('#contact')
// // elForm.innerHTML=strHTML;
// }


// function onRestartForm(){

// }

