const fs = require('fs')
const path = require('path')
var qs = require('querystring')


module.exports = function updateHeader(req, res) {
    var body = ''
    let body2 = [];
    req.on('data', function (chunk) {
        body+=chunk;
        body2.push(chunk); //官方这么用  https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/#request-body
    })
    req.on('end', function (data) {

            var obj = JSON.parse(body)
            body2 = Buffer.concat(body2).toString();
            var obj2 = JSON.parse(body2)

            var imgData = obj.imgData;

            var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
            var dataBuffer = new Buffer(base64Data, 'base64');
            let imgPath = path.join(__dirname, '/../static/image');
            let filename = imgPath+'/header.png'
            fs.writeFile(filename, dataBuffer, function(err) {
                if(err){
                    res.send(err);
                }else{
                    //这里也会报错 自己看
                    console.log("writeFile ok")
                    let port = req.socket.localPort
                    let host = req.hostname
                    let headerSrc = host+':'+port+'/static/image/header.png'
                    let tempRes = {}
                    tempRes['headerSrc'] = headerSrc
                    res.send(tempRes);
                }
            });
        }

    )

}