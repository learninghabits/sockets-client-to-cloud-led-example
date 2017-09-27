module.exports = {
    startSockets: function (cb) {
        var socketsUrl = 'http://www.learninghabits.co.za';
        var io = require('socket.io-client');
        var socket = io.connect(socketsUrl, {
            reconnection: true,
            reconnectionDelay: 1000,
            timeout: 3000,
            multiplex: false
        });
        var led = require('./led')();
        socket.on('SwitchOn', function (data) {
            led.switchOn();
            console.log('sockets switch on message received');
        });
        socket.on('SwitchOff', function (data) {
            led.switchOff();
            console.log('sockets switch off message received');
        });
        socket.on('ToggleState', function (data) {
            led.blink(data);
            console.log('sockets toggle state message received' + data.seconds);
        });
        socket.on('disconnect', function () {
            console.log('client disconnected with ID : ' + socket.id);
        });
        socket.on('connect', function () {
            if (cb) cb();
        });
        socket.on('ping', function (data) {
            socket.emit('pong', { beat: 1 });
        });
    }
};