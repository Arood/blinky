var applescript = require('applescript'),
    g = require('./globals');

module.exports = function() {

  setInterval(function() {

    if (g.prio > 1) {
      return;
    }

    applescript.execString('tell application "Skype" to send command "GET USERSTATUS" script name "online"', function(err, ret) {
      if (!err && ret) {
        if (ret.indexOf("AWAY") !== -1) {
          g.blink.setRGB(255,255,0);
        } else if (ret.indexOf("DND") !== -1) {
          g.blink.setRGB(255,0,0);
        } else {
          g.blink.setRGB(0,255,0);
        }
      }
    });

  }, 10000);

};