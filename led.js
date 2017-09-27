module.exports =  function () {
  var onoff = require('onoff');
  var Gpio = onoff.Gpio,
    led = new Gpio(4, 'out'),
    blueled = new Gpio(17, 'out'),
    interval;

  var unExportGpio = function () {
    led.unexport();
    blueled.unexport();
  }

  return {
    deviceOn: function () {
      blueled.write(1, function () {
        console.log("Device is now connected to the cloud");
      })
    },
    blink: function (data) {
      led.write(0);
      var milliseconds = (data.seconds || 2) * 1000;
      console.log("data.seconds: " + data.seconds);
      interval = setInterval(function () {
        var value = (led.readSync() + 1) % 2;
        led.write(value, function () {
          console.log("Changed LED state to: " + value);
        });
      }, milliseconds)
    },
    switchOn: function () {
      if (interval) {
        clearInterval(interval);
        interval = undefined;
      }
      led.write(1, function () {
        console.log("Changed LED state to ON");
      })
    },
    switchOff: function () {
      if (interval) {
        clearInterval(interval);
        interval = undefined;
      }
      led.write(0, function () {
        console.log("Changed LED state to OFF");
      })
    },
    exit: function () {
      unExportGpio();
    }
  }
}