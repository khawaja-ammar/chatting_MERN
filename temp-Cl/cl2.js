const { io } = require('socket.io-client');

const socket = io('http://localhost:3500', {
	auth: {
		username: 'ammar',
		token: 'abc',
	},
});
socket.on('connect', () => {
	console.log(socket.id);
});
