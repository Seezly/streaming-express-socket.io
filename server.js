const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));

app.route('/')
	.get((req, res) => {
		res.sendFile(`${__dirname}/public/client.html`);
	});

app.route('/streaming')
	.get((req, res) => {
		res.sendFile(`${__dirname}/public/server.html`);
	});

io.on('connection', (socket) => {

	socket.on('streaming', (stream) => {
		io.emit('play', stream);
	});
	
});

http.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});