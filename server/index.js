/**
 * Created by juntingliu2 on 2017/3/31.
 */
// 后台入口文件
const express = require('express')
const app = express()
//var bodyParser = require('body-parser')
//app.use( bodyParser.urlencoded({ extended: false }));
app.set('port', (process.env.port || 3100))
app.listen(app.get('port'), function () {
    console.log('Visit http://localhost:' + app.get('port'))
})

let server = require('http').createServer(app);
var io = require('socket.io').listen(server);
io.sockets.on('connection',function(socket){
    socket.emit('message',{text:'你上线了'});
    count++;
    console.log('User connected' + count + 'user(s) present');
    socket.emit('users',{number:count});
    socket.broadcast.emit('users',{number:count});
    socket.on('disconnect',function(){
        count--;
        console.log('User disconnected');
        socket.broadcast.emit('users',{number:count});
    });
});

app.use('/', require('./route'));






