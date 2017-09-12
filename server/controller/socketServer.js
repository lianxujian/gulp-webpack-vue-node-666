module.exports = function socketServer(socket) {
    let count = 0;
    console.log('User connected');
    count++;
    socket.emit('users',{number:count});
    socket.broadcast.emit('users',{number:count});
    socket.on('disconnect',function(){
        count--;
        console.log('User disconnected');
        socket.broadcast.emit('users',{number:count});
    });

}