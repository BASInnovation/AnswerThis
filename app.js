

var express = require('express');
var path = require('path');
var app = express();
var SMSreciever = require('./routes/reciever');
var HTTPreciever = require('./routes/httpreciever');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/gottext', SMSreciever.TextRecieved);

app.get('/stats', HTTPreciever.HTTPRecieved);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});