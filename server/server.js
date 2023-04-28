require('dotenv').config();
const express = require('express');

const app = express();

const http = require('http').Server(app);
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = require('./config/corsOptions');

// Socket IO connection
const { io } = require('./socket');

io.attach(http, {
    cors: corsOptions,
});

const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

const verifyJWT = require('./middleware/verifyJWT');

const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

app.use(logger);

app.use(cors(corsOptions));

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// serve static files
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
