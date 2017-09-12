let count = 0;
module.exports = function socketServer(socket) {
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