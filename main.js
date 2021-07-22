window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('sw.js');
  }
}
const inbox = document.getElementById('inbox');
const addbtn= document.getElementById('addbtn');
const clrbtn= document.getElementById('clrbtn');
const todo = document.querySelector('.todolist');
showtask();
inbox.onkeyup = ()=>{
    let userData = inbox.value;
    if(userData.trim() != 0){
      addbtn.classList.add("active");
    }
    else{
      addbtn.classList.remove("active");
    }
}

addbtn.onclick = ()=>{
   let userData = inbox.value;
   let getlocal = localStorage.getItem("New Todo");
   if(getlocal == null){
     listarr = [];
   }else{
     listarr = JSON.parse(getlocal);
   }
   listarr.push(userData);
   localStorage.setItem('New Todo', JSON.stringify(listarr));
   showtask();
}

function showtask(){

  let getlocal = localStorage.getItem("New Todo");
  if(getlocal == null){
    listarr = [];
  }else{
    listarr = JSON.parse(getlocal);
  }
  let newlitag = '';
  listarr.forEach((item, i) => {
    newlitag += '<li>' + item + '<span onclick="deleteit('+ i +')">-</span> </li>';
    todo.innerHTML = newlitag;
    inbox.value = "";
    addbtn.classList.remove("active");
    let number = document.getElementById('num');
    number.innerHTML = listarr.length;
  });

}
function deleteit(index){
  let getlocal = localStorage.getItem("New Todo");
  listarr = JSON.parse(getlocal);
  listarr.splice(index, 1);
  localStorage.setItem('New Todo', JSON.stringify(listarr));
  if(listarr.length == 0){
    location.reload();
  }
  showtask();
}

clrbtn.onclick = ()=>{
  listarr = [];
  localStorage.setItem('New Todo', JSON.stringify(listarr));
  location.reload();
  showtask();
}
