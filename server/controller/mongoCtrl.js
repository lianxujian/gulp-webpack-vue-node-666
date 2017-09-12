/**
 * Created by juntingliu2 on 2017/4/6.
 */
const mongoose = require("mongoose");
const path = require('path');
let Util = require('../lib/util');
mongoose.connect('mongodb://localhost/myblog', function () {
    console.log("默认blog连接成功！");
});
let Schema = mongoose.Schema;
//骨架模版
let accountSchema = new Schema({
    user: String,
    password: String
});
//模型
let Account = mongoose.model('Account', accountSchema);
/*//存储数据
let account1 = new Account({
    user: 'junting',
    password: 'junting'
});
//保存数据库
account1.save(function (err) {
    if (err) {
        console.log('保存失败！')
        return;
    }
    console.log('保存成功！')
})*/
/*new Account({
    user: '1',
    password: '1'
}).save()*/
module.exports = function showArt(req, res) {
    req.on('data', function (data) {
        let tempContent = Util.cloneObject(JSON.parse(decodeURIComponent(data)))
        switch (tempContent.ope) {
            case 'login':
                // mongoose find
                let fields = {user: 1, password: 1}; // 查询条件
                Account.find({user: tempContent.user}, fields, function (error, result) {
                    let tempRes = {
                        errMsg: '',
                        flag: 1
                    }
                    if (error) {
                        tempRes.errMsg = error
                    }
                    result.forEach(function (item) {
                        if (item.password === tempContent.password) {
                            tempRes.flag = 0
                        }
                    })
                    res.send(tempRes)
                });
                break;
            case 'update' :
                let update = {password: tempContent.password}
                Account.update({user: tempContent.user}, update, function(error){
                    let tempRes = {
                        errMsg: '',
                        flag: 1
                    }
                    if (error) {
                        tempRes.errMsg = error
                    }
                    tempRes.flag = 0
                    res.send(tempRes)
                })
                break;
            default:
                break;
        }
    })
}
