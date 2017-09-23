var express = require('express');
var app = express();
var http = require('http').Server(app);
var sr = require('./socketsreceiver');
var led = require('./led');

sr.startSockets(function() {
    led.deviceOn();
});

app.get('/led/on', function (request, response) {
    led.switchOn();
    response.status(200)
        .send('OK');
});

app.get('/led/off', function (request, response) {
    led.switchOff();
    response.status(200)
        .send('OK');
});

app.get('/led/blink/:seconds', function (request, response) {
    var seconds = (request.query.Seconds || request.query.seconds) || (request.params.Seconds || request.params.seconds);
    led.blink({ seconds: seconds });
    response.status(200)
        .send('OK');
});

app.get('*', function (req, res) {
    res.send("This sockets client is ready for get comms");
});

var port = process.argv.slice(2)[0] || (process.env.PORT || 80);

http.listen(port, function () {
    console.log("SERVER IS LISTENING ON PORT: " + port);
    console.log("CTRL+C TO STOP ");
});

process.on('SIGINT', function () {
    led.exit();
    console.log('BYE BYE, STOPPED GRACIOUSLY!');
    process.exit();
});