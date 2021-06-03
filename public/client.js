(((io) => {

	const socket = io();
	
	socket.on('play', (stream) => {
		document.getElementById('streaming').src = stream;
	});

})(io))