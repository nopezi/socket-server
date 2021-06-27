// var io = require('socket.io').listen(8000);
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 2500
const io2 = require('socket.io')

var clientURL = 'http://localhost/inditama/laundryapp_tes/welcome/tes'
const options = { 
    cors: true, 
    origin: clientURL,
    allowEIO3: true, 
}
const socket2 = io2(port, options)
// console.log(socket2)

app.get('/coba', (req, res, next) => {

})

io.emit('dataServer', 'online')

socket2.sockets.on('connection', function (socket) {
  console.log('user connected!');

  socket.on('foo', function (data) {
    console.log('here we are in action event and data is: ' + data);
  });
});

// http.listen(port, () => {
  console.log('port nya adalah ' + port);
// })