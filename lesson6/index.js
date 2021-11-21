const io = require('socket.io')
const app = require('./app');

const socketServer = io(app);

const chat = socketServer.of("/");
const explorer = socketServer.of("/explorer");

const DATABASE = {
    storage: {},
    async saveUser(data, id) {
        await new Promise(resolve => setTimeout(resolve, 500));
        this.storage[id] = data.payload;
    }
};

chat.on('connection', function (socket) {
    socket.emit("NEW_CONNECT");
    socketServer.emit("USER_COUNT", explorer.sockets.size)

    socket.on('CLIENT_MSG', (data) => {
        chat.emit('SERVER_MSG', {msg: data, user: DATABASE.storage[socket.id]});
    });

    socket.on('SAVE_USER_DATA', async function (data, res) {
        await DATABASE.saveUser(data, socket.id);
        socket.broadcast.emit('JOIN_USER', {user: data.payload})
        res("ok");
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit('LEAVE_USER', {user: DATABASE.storage[socket.id]})
    })
});

explorer.on('connection', function (socket) {
    explorer.emit("USER_COUNT", explorer.sockets.size)
    socketServer.emit("USER_COUNT", explorer.sockets.size)

    socket.on("disconnect", () => {
        explorer.emit("USER_COUNT", explorer.sockets.size)
        socketServer.emit("USER_COUNT", explorer.sockets.size)
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
})
