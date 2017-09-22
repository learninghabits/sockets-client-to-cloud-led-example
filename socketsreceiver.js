module.exports = {
    startSockets: function (cb) {
        var socketsUrl = 'http://www.learninghabits.co.za';
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
            console.log('sockets toggle state message received' + data.seconds);
        });
        socket.on('disconnect', function () {
            console.log('client disconnected with ID : ' + socket.id);
        });
	socket.on('connect', function(){
		if (cb) cb();
	});
    }
};