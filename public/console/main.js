//import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";




 let socket = io();
 console.log("connection successful")



const message = document.getElementById('messageinput');
const consoleWindow = document.getElementById('consoleoutput');








//ipdat-init apikey
//iplookup ip
//send message
function emitDat() {
  //iplookup APIKEY ip
  if(message.value.includes("iplookup")){IpLookup(message.value.split(" ")[1])}
  console.log(message.value);
  socket.emit("StatusUpdate",
  {
    message: message.value
  });
}

document.getElementById("button").addEventListener("click", emitDat);









socket.on('consoleUpdate', (data) => {
  consoleWindow.value += "\n" + data.message;
  consoleWindow.scrollTop = consoleWindow.scrollHeight;

});











//ipdata
function IpLookup(ip){
  var info = getJSON("https://api.ipdata.co/"+ip+"?api-key=4b97679d3e26121056bf870942785fff4e664d4b8d2e500a77335460&fields=ip,city,region,country_name,carrier", 
  function(err, data){
    consoleWindow.value += "\n============================";
    consoleWindow.value += "\n  ~~~~ " + ip +"  ~~~~ ";
    consoleWindow.value += "\ncity:" + data.city;
    consoleWindow.value += "\nregion:" + data.region;
    consoleWindow.value += "\ncountry:" + data.country_name;
    consoleWindow.value += "\ncarrier:" + data.carrier.name;
    consoleWindow.value += "\n============================";
  
    consoleWindow.scrollTop = consoleWindow.scrollHeight;
  });

}


var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};



//
