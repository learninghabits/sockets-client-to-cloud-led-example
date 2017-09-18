module.exports = {
    startSockets: function () {
        var socketsUrl = 'http://localhost:8080';
        var socket = require('socket.io-client')(socketsUrl);
        socket.on('SwitchOn', function (data) {
            var led = require('./led');
            led.switchOn();
            console.log('sockets switch on message received');
        });
        socket.on('SwitchOff', function (data) {
            var led = require('./led');
            led.switchOff();
            console.log('sockets switch off message received');
        });
        socket.on('ToggleState', function (data) {
            var led = require('./led');
            led.blink(data);
            console.log('sockets toggle state message received');
        });
        socket.on('disconnect', function () {
            console.log('client disconnected with ID : ' + socket.id);
        });
    }
};