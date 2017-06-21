/**
 * Created by juntingliu2 on 2017/4/5.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')
var resolve = file => path.resolve(__dirname, file)
router.use('/dist', express.static(resolve('./client/dist')))

router.get('/', function (req, res) {
    const html = fs.readFileSync(resolve('./client/index.html'), 'utf-8')
    res.send(html)
})

router.post('/showArtList', require('./controller/allArtCtrl'))
router.post('/showArt',require('./controller/showArtCtrl'))
router.post('/createArt',require('./controller/createArtCtrl'))
router.post('/operateMongo',require('./controller/mongoCtrl'))
module.exports = router
