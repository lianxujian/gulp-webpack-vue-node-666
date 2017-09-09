const fs = require('fs')
const path = require('path')
var qs = require('querystring')


module.exports = function updateHeader(req, res) {
    var body = ''
    req.on('data', function (chunk) {
        body+=chunk
    })
    req.on('end', function (data) {
        var obj = qs.parse(body)
        var imgData = obj.imgData;
        //过滤data:URL
        var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64Data, 'base64');
        let imgPath = path.join(__dirname, '/../static/image');
        let filename = imgPath+'/header.png'
        fs.writeFile(filename, dataBuffer, function(err) {
            if(err){
                res.send(err);
            }else{
                let port = req.socket.localPort
                let host = req.hostname
                let headerSrc = host+':'+port+'/static/image/header.png'
                tempRes['headerSrc'] = headerSrc
                res.send(tempRes);
            }
        });
    })

}