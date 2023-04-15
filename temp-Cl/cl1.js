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

const addFriend = 'khawaja';

socket.emit('socket/add_contact', addFriend);
// socket.emit('socket/send_msg', 'khawaja');
socket.on('test', (msg) => console.log(msg));
