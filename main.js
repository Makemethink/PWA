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
let indexed = 0;
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
    //newlitag += '<li>' + item + '<span onclick="openit('+ i +')">+<span onclick="deleteit('+ i +')" >-</span></span></li>';
    newlitag += '<li>' + item + '<div class="span" style="display:inline" onclick="openit('+ i +')">+</div><div class="spans" style="display:inline" onclick="deleteit('+i+')">-</div></li>';
    todo.innerHTML = newlitag;
    inbox.value = "";
    addbtn.classList.remove("active");
    let number = document.getElementById('num');
    number.innerHTML = listarr.length;
  });

}
function save(){
  alert("saving it...");
  let getlocal = localStorage.getItem("New Todo");
  let edit = document.getElementById('exampleModalLongTitle');
  listarr = JSON.parse(getlocal);
  listarr[indexed] = edit.innerHTML;
  $('#exampleModalCenter').modal('hide');
  localStorage.setItem('New Todo', JSON.stringify(listarr));
  showtask();
}
function openit(index){
  let getlocal = localStorage.getItem("New Todo");
  listarr = JSON.parse(getlocal);
  $('#exampleModalCenter').modal('show');
  let edit = document.getElementById('exampleModalLongTitle');
  edit.innerHTML = listarr[index];
  indexed = index;
}

function deleteit(index){
 if (confirm("You want to delete it!")) {
   txt = 1;
   } else {
     txt = 2;
   }
   if(txt == 2)
   {
     return;
   }
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
