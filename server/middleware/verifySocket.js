const jwt = require('jsonwebtoken');

const verifySocket = (socket, next) => {
    const user = socket.handshake.auth.user;
    const token = socket.handshake.auth.token;
    console.log(user);
    console.log(token);

    if (!token || !user) next(new Error('Authentication error'));

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            // console.log('err1');
            next(new Error('Authentication error'));
        } else if (decoded?.UserInfo?.username != user) {
            // console.log('err2');
            next(new Error('Authentication error'));
        }
        next();
    });
};

module.exports = verifySocket;
