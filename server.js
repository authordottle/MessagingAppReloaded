const express = require('express');
const app =  express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const fs = require('fs');

var userOnline = [];
var User;

app.use(express.static(__dirname + '/style.css'));

server.listen(port, () => {
  console.log(`Express server listening on port: ${port} `);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client.html');
});

io.on('connection', function (socket) {
  console.log('User ' + socket.id + ' connected');

  socket.on('onDisconnect', function (username){
    console.log('User ' + socket.id + ' disconnected');
    var index = userOnline.indexOf(username);
    if (index > -1) {
      userOnline.splice(index, 1);
    }
  });

  socket.on('onUserList', function (username, password){
    console.log(username  + ' joined');
    userOnline.push(username);
  });

  socket.on('onStoreNewUser', function (username, password){
    var found = User.find(function(element) {
      return element == 'username';
    });
    if (found == undefined){
      var info = {"username" : [username], "password": [password]}
      fs.writeFile("db.json", JSON.stringify(info));
      console.log(username + ' is stored.')
    }
    else{
      alert('This username already existed.');
    }
  })
});

app.use(express.static('public'));