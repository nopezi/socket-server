const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 2500
const nodemailer = require("nodemailer");

let online = 0;
var nama = 'kucing'

app.get('/', (req, res, next) => {
  ++online
  io.emit('dataServer', online)
  res.send('hai '+ online);
})

app.get('/email', (req, res, next) => {

	let transporter = nodemailer.createTransport({
		host : 'mail.windigitalkhatulistiwa.com',
		port: '465',
		secure: true,
		auth: {
			user: 'info@windigitalkhatulistiwa.com',
			pass: '8Q?by$#qy9'
		}
	})

	let mailoptions = {
		from: 'info@windigitalkhatulistiwa.com',
		to: 'snopezi@gmail.com',
		subject: 'ini judul',
		text: 'ini isi'
	}

	transporter.sendMail(mailoptions, function (err, data) {
		if (err) {
			console.log('error ',err)
			res.send('error '+ err)
		} else{
			console.log('berhasil')
			res.send('berhasil')
		}
	})

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

	socket.on('notifEmail', params => {
		console.log('masok')
		let transporter = nodemailer.createTransport({
			host : 'mail.windigitalkhatulistiwa.com',
			port: '465',
			secure: true,
			auth: {
				user: 'info@windigitalkhatulistiwa.com',
				pass: '8Q?by$#qy9'
			}
		})

		let mailoptions = {
			from: 'info@windigitalkhatulistiwa.com',
			to: params.email,//'snopezi@gmail.com',
			subject: params.judul,
			text: params.isi
		}

		transporter.sendMail(mailoptions, function (err, data) {
			if (err) {
				console.log('error ',err)
			} else{
				console.log('berhasil')
			}
		})

	})

})

http.listen(port, () => {
  console.log('port nya adalah ' + port);
})