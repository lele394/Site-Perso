let socket = io();
console.log("connection successful")

//send message
function emitDat(action) {
    console.log(action);
    socket.emit("StatusUpdate",
    {
        message: "TICTACTOE",
        row : action[0],
        col : action[1],
    });
}

document.getElementById("c1-1").onclick = function() {emitDat([1,1])}
document.getElementById("c1-2").onclick = function() {emitDat([1,2])}
document.getElementById("c1-3").onclick = function() {emitDat([1,3])}

document.getElementById("c2-1").onclick = function() {emitDat([2,1])}
document.getElementById("c2-2").onclick = function() {emitDat([2,2])}
document.getElementById("c2-3").onclick = function() {emitDat([2,3])}

document.getElementById("c3-1").onclick = function() {emitDat([3,1])}
document.getElementById("c3-2").onclick = function() {emitDat([3,2])}
document.getElementById("c3-3").onclick = function() {emitDat([3,3])}



function UpdateCaseStatusFriendly(element) {
    element.textContent = "O";
}
function UpdateCaseStatusEnemy(element) {
    element.textContent = "X";
}



socket.on('TTCUPDATE', (data) => {
    //console.log(socket.id);
    //console.log(data);
    if(data.player == "RESET")
    {
        location.reload();
    }

    if(data.player == "ALREADY PLAYED"){
        console.log("already played");
        if(data.actfrom == socket.id){
            alert("already played");
        }
        return

    }

    if(data.player == "CELL TAKEN"){
        console.log("cell taken");
        if(data.actfrom == socket.id){
            alert("cell taken");
        }
        return
    }


    if(data.player == "WIN"){
        console.log("win from " + data.winner);
        if(data.winner == socket.id){
            alert("You Won!");
            ResetGrid()
        }
        else {
            alert("Your Opponent Won :(");
            ResetGrid()
        }
        return
    }




    if(data.player == socket.id)
    {
        UpdateCaseStatusFriendly(document.getElementById( "c"+data.row + "-" + data.col).firstChild);
    }
    else
    {
        UpdateCaseStatusEnemy(document.getElementById( "c"+data.row + "-" + data.col ).firstChild);
    }


  
  });





document.getElementById("reset").onclick = function() {ResetGrid()}

//initialize grid
function ResetGrid(){
    console.log("GRID RESET");
    socket.emit("StatusUpdate",
    {
        message: "TICTACTOE",
        data : "TICTACTOE RESET"
    });
}
