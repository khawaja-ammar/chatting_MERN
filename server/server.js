require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const cors = require('cors');
const corsOptions = require('./config/corsOptions');

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

// custom middleware logger
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

// io.use(verifySocket);
io.on('connection', (socket) => {
	console.log('new connection');

	socket.on('socket/send_msg', (receiver, msg) => {
		const res = socketController.sendMessage(
			socket.handshake.auth.user,
			receiver,
			msg
		);
	});
	// check if the chat exists in DB, add to chat and push msg to the reciever's DB

	socket.on('disconnect', () => {
		console.log('closed connection');
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
