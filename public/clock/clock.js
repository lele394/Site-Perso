const hoursHand = document.getElementById("hours"),
  minutesHand = document.getElementById("minutes"),
  secondsHand = document.getElementById("seconds");

  window.onload = function() {            
    function test() {
        alert("test");
    }
    setInterval(UpdateHands, 10);
}


function UpdateHands(){

    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var milliseconds = now.getMilliseconds();
    
    //hours, minutes, seconds = 0, 0, 0;
    
    //+180 redresse tout droit ( rotation de pi de base)

    var rh = ((hours+ minutes/60)*360/12) -180;
    var rm = ((minutes+ seconds/60)*360/60) -180;
    var rs = ((seconds+ milliseconds/100/10)*360/60) -180;

    hoursHand.style.setProperty('--angle', rh +"deg");
    minutesHand.style.setProperty('--angle', rm +"deg");
    secondsHand.style.setProperty('--angle', rs +"deg");
    
    //console.log( rh, rm, rs)
}









//document.documentElement.style.setProperty("--pin-color", "white")