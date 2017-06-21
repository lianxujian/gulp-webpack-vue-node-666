/**
 * Created by juntingliu2 on 2017/4/6.
 */
const fs = require('fs')
const path = require('path')
let Util = require('../lib/util')

module.exports = function showArt(req, res) {
    req.on('data', function (data) {
        let tempContent = Util.cloneObject(JSON.parse(decodeURIComponent(data)))
        let artPath = path.join(__dirname, '/../static/article');
        files = fs.readdirSync(artPath);
        let filename = artPath+'/article'+files.length+'.txt'
        fs.writeFile(filename, tempContent['content'], function(err){
            let tempRes = {
                errMsg: '',
                flag: 0
            }
            if (err) {
               tempRes.errMsg=err
                tempRes.flag = 1
            }
            res.send(tempRes)
        })
    })
}
