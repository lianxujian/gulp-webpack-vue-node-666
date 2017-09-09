/**
 * Created by juntingliu2 on 2017/3/31.
 */
// 后台入口文件
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use( bodyParser.urlencoded({ extended: false }));
app.set('port', (process.env.port || 3100))
app.listen(app.get('port'), function () {
    console.log('Visit http://localhost:' + app.get('port'))
    //const host = app.address().address
    //const port = app.address().port
})
app.use('/', require('./route'));






