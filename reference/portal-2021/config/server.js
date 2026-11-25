/* eslint-disable */

// [JM] This file is required temporarily to serve
// a static website using serverless applications
// so that the webapp won't crash at startup

var express = require('express');
var server = express();

// [JM] By default, Azure Web Apps choose hostingstart.html
// this object overrides that setting
var options = {
    index: 'index.html'
};

server.use('/', express.static('/home/site/wwwroot', options));
server.listen(3000);
