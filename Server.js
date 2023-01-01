var express = require("express"), app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path')







clients = [];

IPsSinceStart = []; //probably illegal
const IPLogger = function LogIp(req, res, next) {
  var ip = req.socket.remoteAddress;
  console.log("logger: "+ip);
  if(!IPsSinceStart.includes(ip))
  {
    IPsSinceStart.push(ip)
  }
  next();
}
app.use(IPLogger)//commet to disable


const port = 3000;

app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/', express.static(path.join(__dirname, './')));
app.use(express.static(__dirname +'/'));


app.use('/', express.static(path.join(__dirname, './')));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.get('*', function(req, res){
  res.status(404).sendFile(__dirname + '/public/404.html');
});








//=========== TIC TAC TOE VARS ==========
var TTT_LastPlayer = "";
var TTT_Grid = [[0,0,0],[0,0,0],[0,0,0]]; //0=free , 1=prispar P1, 2=prispar P2





io.on('connection', (socket) => {
  var address = socket.request.connection.remoteAddress;
  console.log(`A user connected with id ${socket.id} from ` + address);
  clients.push(socket.id);
  io.emit('consoleUpdate', {message: `connected with id ${socket.id} from ` + address})


  socket.on('StatusUpdate', function(data) {


    if(data.message == "help")
    {
      io.emit('consoleUpdate',
      {
        message: `============= H E L P =============
 - ping : check server connection
 - socket info : gets socket infos of the client from the server (ip, port)
 - dump ips: dumps the log of all ips connected since server started`
      });
    }




    if(data.message == "ping")
    {
      console.log(`ping from ${socket.id}`);
      io.emit('consoleUpdate',
      {
        message: "ping received"
      });
    }


    if(data.message == "socket info")
    {
      let a = GetConnectionInfo(socket)
      io.emit('consoleUpdate',
      {
        message: `
========= socket info =========
IP   : ${a.ip}
===============================`
      });
    }



    if(data.message == "dump ips")
    {
      console.log("ip dump detected");
      io.emit('consoleUpdate',
      {
        message: IPsSinceStart
      });
    }







//========= TIC TAC TOE ==========


  if(data.message == "TICTACTOE")
  {
    console.log(`${socket.id} played ${data.row},${data.col}`);

    if(data.data == "TICTACTOE RESET")
    {
      console.log("TTC grid reset")
      TTT_LastPlayer = "";
      TTT_Grid = [[0,0,0],[0,0,0],[0,0,0]];
      io.emit('TTCUPDATE',
        {
          player: "RESET"
        });
      return
    }


    if(socket.id != TTT_LastPlayer) //check player different
    {

      console.log(TTT_Grid);
      if(TTT_Grid[data.row-1][data.col-1] != 0){//check cell
        io.emit('TTCUPDATE',
        {
          player: "CELL TAKEN",
          actfrom: socket.id,
        });
        return
      }
      else
      {
        TTT_Grid[data.row-1][data.col-1] = socket.id;
      }
      


        io.emit('TTCUPDATE',
        {
          player: socket.id,
          row : data.row,
          col : data.col
        });
        TTT_LastPlayer = socket.id;

      var winner = TTT_Winner(TTT_Grid);//detect winner
      if(winner != null) { 
        io.emit('TTCUPDATE',
        {
          player: "WIN",
          winner : winner
        });
      }



      }
        else{
          io.emit('TTCUPDATE',
          {
            player: "ALREADY PLAYED",
            actfrom: socket.id
          });
        }







  }





})











  socket.on('disconnect', (socket) => {
    console.log(`A user disconnected with id ${socket.id}`);
  //del id from client list
    if (clients.indexOf(socket.id) > -1) { // only splice array when item is found
      clients.splice(index, 1); // 2nd parameter means remove one item only
    }
  })
});







class Socket {
  constructor(socket) {
    this.ip = socket.request.connection.remoteAddress;
  }
}

function GetConnectionInfo(socket) {
  return new Socket(socket);
}













http.listen(port, function(){//port 3000
  console.log('listening on port 3000');
})






function TTT_Winner( grid ) {
  /* 
  
  check winners de la grid, return socket.id du gagnant, ou null si il n'y en a pas
  
  
  
  https://mathworld.wolfram.com/MagicSquare.html

  carré magique : somme diag col row donne 15
  [
    [ 8 , 1 , 6 ],
    [ 3 , 5 , 7 ],
    [ 4 , 9 , 2 ]
  ]*/

  /* check les joueurs en présence*/

  var carreMagique = [
    [ 8 , 1 , 6 ],
    [ 3 , 5 , 7 ],
    [ 4 , 9 , 2 ]
  ];



  var joueurs = [0];
  for(const row of grid) {
    for(const element of row) {
      if(!joueurs.includes(element))
      {
        joueurs.push(element)
      }
    }
  }
  joueurs.splice(0,1); //rm le 0

  for(const p of joueurs){

    //calcul somme pour les joueurs
    var sum = 0;
    var x=0;
    for(const row of grid){
      y = 0
      for(const item of row){
        if(item == p){
          sum += carreMagique[x][y]
        }
        y ++
      }
      x ++
    }

    if(sum == 15){
      return p
    }

  }


  return null;

}