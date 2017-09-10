const fs = require('fs')
const path = require('path')
var qs = require('querystring')
var streamRequest = require('stream-request');

module.exports = function updateHeader(req, res) {
    let body2 = [];
    req.body.stream;
    res.send(req.stream);

}