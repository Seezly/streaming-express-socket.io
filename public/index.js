(((io) => {

	const socket = io();
	const video = document.getElementById('video');
	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	var startCamera = false;

	const getVideo = () => {
		navigator.mediaDevices.getUserMedia({video: true, audio: false})
			.then(stream => {
				startCamera = true;
				video.srcObject = stream;
				streamVideo(context, canvas, video);
			})
			.catch(err => {
				console.error(err);
			});
	};

	const playVideo = (callback) => {
		return window.requestAnimationFrame(callback)
	};

	const streamVideo = (ctx, c, v) => {
		const outputStream = c.toDataURL('image/jpeg', .2);
		ctx.drawImage(v, 0, 0);

		if (startCamera) {
			socket.emit('streaming', outputStream);
		}

		playVideo(() => {
			streamVideo(ctx, c, v);
		});
	};

	document.addEventListener('DOMContentLoaded', () => {
		getVideo();
		video.autoplay = true;
		video.style.display = 'none';
	});

})(io))