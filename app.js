

var express = require('express');
var app = express();
var SMSreciever = require('./routes/reciever')

app.get('/gottext', SMSreciever.TextRecieved);



var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});