const socketIo = require('socket.io');
const winston = require('winston');

module.exports = (server, app) => {
    const io = socketIo(server);
    io.on('connection', socket => {
        socket.on('disconnect', () => winston.info('Client disconnected'));
    });

    // WebSocket.
    app.set('socketio', io);
};