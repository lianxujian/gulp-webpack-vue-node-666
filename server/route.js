/**
 * Created by juntingliu2 on 2017/4/5.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')
var url= require('url')

var resolve = file => path.resolve(__dirname, file)

router.use('/dist', express.static(resolve('./client/dist')))

router.get('/index', function (req, res) {
    const html = fs.readFileSync(resolve('./client/index.html'), 'utf-8')
    res.send(html)
})

router.post('/showArtList', require('./controller/allArtCtrl'))
router.post('/showArt',require('./controller/showArtCtrl'))
router.post('/createArt',require('./controller/createArtCtrl'))
router.post('/operateMongo',require('./controller/mongoCtrl'))
router.post('/updateHeader',require('./controller/updateHeader'))

/*router.get('/static/!*',function (req, res) {
    var filePath = path.join(__dirname, url.parse(req.url).pathname)
    var stream = fs.createReadStream(filePath)
    stream.pipe(res)
    //res.sendFile(filePath)
})*/
module.exports = router
