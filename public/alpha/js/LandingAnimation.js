const star = document.querySelector('#star')
const shuttle = document.querySelector('#shuttle')


var StarSpeed = 0.52;



function MoveStuff() {
  var h = window.innerHeight;
  var wy = window.scrollY; // Value of scroll Y in px

  var Shuty = 0.0004*wy*wy + wy;
  var Stary = StarSpeed*wy + 0.6*h;
  
  

  star.style.bottom = Stary + "px";
  shuttle.style.bottom = Shuty + "px";
}


window.onscroll = function (e) {

  window.requestAnimationFrame(MoveStuff);

};
