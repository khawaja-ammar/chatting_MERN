// const corsOptions = require('./config/corsOptions');
const io = require('socket.io')();

const activeUsers = new Map();
global.activeUsersMap = activeUsers;

const verifySocket = require('./middleware/verifySocket');
const socketController = require('./controllers/socketController');

io.use(verifySocket);

io.on('connection', (socket) => {
    const sender = socket.handshake.auth.user;
    console.log('new connection', socket.id, sender);
    activeUsers.set(sender, socket);

    socket.on('test', () => {
        console.log('socket test');
        socket.emit('test', 'Hello');
    });
    socket.on('socket/send_msg', (receiver, msg, callback) => {
        console.log('sending msg', msg);
        const addMessage = async () => {
            const res = await socketController.addMessageDB(
                sender,
                receiver,
                msg,
            );
            console.log(res);
            if (res === 'ok') {
                const sendSocket = activeUsers.get(receiver);
                if (sendSocket) sendSocket.emit('socket/recv_msg', sender, msg);
            }
            callback(res);
        };
        addMessage();
    });

    socket.on('disconnect', () => {
        console.log('client dc');
        activeUsers.delete(socket.handshake.auth.user);
    });
});

module.exports = { io };
