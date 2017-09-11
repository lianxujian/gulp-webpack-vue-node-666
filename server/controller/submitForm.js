const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const formidable = require('formidable')
const util = require('util');

module.exports = function updateHeader(req, res) {
    const { headers, method, url } = req;
    req.on('error',(err) => {
        console.error(err);
        res.end();
    })
    //程序都应该有必要的容错
    res.on('error',(err) => {
        console.error(err);
        res.end();
    })
    var form = new formidable.IncomingForm();
    form.uploadDir =path.join(__dirname, '/../static/upload');
    form.on('file', function(name, file) {
        //先
        //修改名字的作用
        var types = file.name.split('.'); //将文件名以.分隔，取得数组最后一项作为文件后缀名。
        var date = new Date();
        var ms = Date.parse(date); //计算当前时间与1970年1月1日午夜相差的毫秒数 赋值给ms以确保文件名无重复。
        fs.renameSync(file.path,form.uploadDir +  "/files" + ms +"." + String(types[types.length-1]));
    });

    form.parse(req, function(err, fields, files) {

        //res.writeHead(200, {'content-type': 'application/json'});
        //res.write('received upload');
        //res.end(util.inspect({fields: fields, files: files}));
        res.send({fields: fields, files: files});
    });

}