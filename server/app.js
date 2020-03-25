const jwt = require('jsonwebtoken');
const socketIO = require('socket.io');
const http = require('http');
require('express-async-errors');
const cors = require('cors');
const express = require('express');

const { jwtPassword } = require('./config/environment');

const app = express();

const server = http.Server(app);
const io = socketIO(server);

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use((req, res, next) => {
    req.io = io;
    return next();
});

require('./startup/route-handler')(app);

require('./startup/error-handler')(app);

require('./startup/db')(server);

server.addListener('listening', _ => console.log(`Listening Now...`));

// To reduce number of connections, only authenticated(Verified) users are allowed to connect.
io
    .use((socket, next) => {
        const token = socket.handshake.query.token;
        jwt.verify(token, jwtPassword, (err, decoded) => {
            if (err || (!decoded.verified)) return next(new Error(`Unauthenticated`));

            return next();
        });
    })
    .on('connect', socket => {
        console.log(`User connected`);
    });