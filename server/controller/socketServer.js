const mongoose = require("mongoose");
var db = mongoose.createConnection('localhost', 'mychat');//该方法适应于一个服务有多个数据库

db.once('open', function () {
    console.log("chat连接成功！");
})
let Schema = mongoose.Schema;
//骨架模版
let chatSchema = new Schema({
    user: String,
    time: String,
    content: String
});
//模型
let ChatModel = db.model('ChatModel', chatSchema);

let count = 0;
module.exports = function socketServer(socket) {
    console.log('User connected');
    count++;
    new ChatModel({
        user: 'system',
        time: new Date().getDate(),
        content: '' + count
    }).save()
    socket.emit('users', {number: count});
    socket.broadcast.emit('users', {number: count});
    socket.on('disconnect', function () {
        count--;
        console.log('User disconnected');
        socket.broadcast.emit('users', {number: count});
    });

}