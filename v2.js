const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 2500

let online = 0;
var nama = 'kucing'

app.get('/', (req, res, next) => {
  ++online
  io.emit('dataServer', online)
  res.send('hai '+ online);
})

io.on('connection', (socket) => {
	
	socket.on('dariServer', online => {
		console.log('masok ', online)
		io.emit('dataServer', online)
	})

})

http.listen(port, () => {
  console.log('port nya adalah ' + port);
})