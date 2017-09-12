/**
 * Created by juntingliu2 on 2017/3/31.
 */
// 后台入口文件
const express = require('express')
const socketIo = require('socket.io');
const http = require('http')

let app1 = express()
app1.set('port', (process.env.port || 3100))
let server1 = http.createServer(app1);
server1.listen(app1.get('port'), function () {
    console.log('Visit http://localhost:' + app1.get('port'))
})
app1.use('/', require('./route'));


let app2 = express();
let server2 = http.createServer(app2);
let io = socketIo.listen(server2);
io.sockets.on('connection',function(socket){
    let count = 0;
    socket.emit('message',{text:'你上线了'});
    count++;
    socket.emit('users',{number:count});
    socket.broadcast.emit('users',{number:count});
    socket.on('disconnect',function(){
        count--;
        console.log('User disconnected');
        socket.broadcast.emit('users',{number:count});
    });
});
server2.listen(3000);







