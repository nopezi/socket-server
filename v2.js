const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 2500
const nodemailer = require("nodemailer");


let online = 0;
var nama = 'kucing'

app.get('/email', (req, res, next) => {

	// let transporter = nodemailer.createTransport({
	// 	host : 'mail.windigitalkhatulistiwa.com',
	// 	port: '465',
	// 	service: 'gmail',
	// 	host: 'ssl://smtp.gmail.com',
	// 	port: 465,
	// 	secure: true,
	// 	auth: {
	// 		user: 'info.dunialaundry@gmail.com',
	// 		pass: '8Q?by$#qy9'
	// 	}
	// })

	// let mailoptions = {
	// 	from: 'info@windigitalkhatulistiwa.com',//'info.dunialaundry@gmail.com',
	// 	to: 'snopezi@gmail.com',
	// 	subject: 'testing and coba',
	// 	text: 'wow bisa'
	// }

	// transporter.sendMail(mailoptions, function (err, data) {
	// 	if (err) {
	// 		var hasil = 'error gays '+ err
	// 		res.send('masok coy '+ hasil)
	// 	} else{
	// 		var hasil = 'berhasil gaes'
	// 		res.send('masok coy '+ hasil)
	// 	}
	// })

})

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

	socket.on('dataPesan', params => {
		io.emit('dataPesan', params)
	})

	socket.on('dataNotif', params => {
		io.emit('dataNotif', params)
	})

	socket.on('pesanEmail', params => {

		// let transporter = nodemailer.createTransport({
		// 	host : 'mail.windigitalkhatulistiwa.com',
		// 	port: '465',
		// 	secure: true,
		// 	auth: {
		// 		user: 'info@windigitalkhatulistiwa.com',
		// 		pass: '8Q?by$#qy9'
		// 	}
		// })

		// let mailoptions = {
		// 	from: 'info@windigitalkhatulistiwa.com',
		// 	to: 'snopezi@gmail.com',
		// 	subject: params.judul,
		// 	text: params.isi
		// }

		// transporter.sendMail(mailoptions)

	})

})

http.listen(port, () => {
  console.log('port nya adalah ' + port);
})