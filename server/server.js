require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http').Server(app);
// const io = require('socket.io')(http)

const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const io = require('socket.io')(http, {
    cors: corsOptions,
});

const path = require('path');

const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

const verifyJWT = require('./middleware/verifyJWT');
const verifySocket = require('./middleware/verifySocket');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 3500;

const socketController = require('./controllers/socketController');

// Connect to MongoDB
connectDB();

app.use(logger);

app.use(cors(corsOptions));

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//serve static files
// app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

// API Routes
app.use(verifyJWT);
app.use('/contacts', require('./routes/api/contacts'));
app.use('/chats', require('./routes/api/chats'));

// Verify Socket
io.use(verifySocket);
const activeUsers = new Map();

// IO Routes + Controllers
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
                msg
            );
            console.log(res);
            if (res == 'ok') {
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

// Invalid URLs
app.all('*', (req, res) => {
    res.status(404);
});

// Error Handling
app.use(errorHandler);

// Listen only when we connected to DB
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
