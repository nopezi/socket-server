const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 2500

const options = {
  cors: true,
  // origin: clientURL,
  allowEIO3: true, // tweaking it may help
}

// const so = io(port, option)

let online = 0;
var nama = 'kucing'

app.get('/', (req, res, next) => {
  ++online
  io.emit('dataServer', online)
  res.send('hai '+ online);
})

app.get('/kirim/:id', (req, res, next) => {
  let id = req.params.id
  res.send('masok '+ id)

})

let jumlahUser = 1;

io.on('connection', (socket) => {

  console.log(socket.rooms);

  socket.on('dariServer', online => {
    io.emit('dataServer', online)
  })

  socket.on('join', params => {
    console.log('user join')
    jumlahUser++
    io.emit('jumlahUser', jumlahUser)
  })

  socket.on('pesan', params => {
    console.log('pesan user')
    io.emit('pesan', params)
  })

  socket.on('keluar', params => {
    console.log('diskonek')
    jumlahUser++
    io.emit('jumlahUser', jumlahUser)
  })

  socket.on('newuser', (id) => {
    io.emit('baru', id)
  })

  socket.on('coba', function (id) {
    io.emit('coba', id);
  })

})

http.listen(port, () => {
  console.log('port nya adalah ' + port);
})