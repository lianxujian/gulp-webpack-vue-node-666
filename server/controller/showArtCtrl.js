/**
 * Created by juntingliu2 on 2017/4/6.
 */
const fs = require('fs')
const path = require('path')
let Util = require('../lib/util')

module.exports = function showArt(req, res) {
    let tempParam = {}
    let tempRes = {}
    req.on('data', function (data) {
        tempParam = Util.cloneObject(JSON.parse(decodeURIComponent(data)))
        fs.readFile(tempParam.path, "utf-8", function (err, data) {
            tempRes['path'] = tempParam.path
            if (err) {
                tempRes['errmsg'] = err
            } else {
                tempRes['content'] = data
            }
            res.send(tempRes)
        })
    })

}