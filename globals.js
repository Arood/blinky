var color = require('onecolor');
var stopPattern = true;

var globals = {
  stopPattern: function() {
    stopPattern = true;
  },
  playPattern: function(name, repeats) {
    var prevprio = globals.prio;
    globals.prio = 20;
    var currentColor;
    var i, p = [], pattern, patterns = globals.patterns, length = patterns.length;
    for (i=0; i<length; i++) {
      if (patterns[i].name === name) {
        pattern = JSON.parse(JSON.stringify(patterns[i]));
      }
    }
    if (!pattern) return;

    pattern.pattern = pattern.pattern.split(",");
    pattern.pattern.shift();

    for (i=0; i<=pattern.repeats; i++) {
      p = p.concat(pattern.pattern);
    }

    if (stopPattern) {
      stopPattern = false;
    }

    var run = function() {
      if (p.length < 3 || stopPattern) {
        if (repeats > -1 || stopPattern) {
          globals.prio = prevprio;
          globals.blink.setRGB(currentColor[0], currentColor[1], currentColor[2]);
          return;
        } else {
          p = p.concat(pattern.pattern);
        }
      }
      var rgb = color(p.shift()),
          time = parseFloat(p.shift()),
          index = parseInt(p.shift(), 10);
      if (time == 0) {
        globals.blink.setRGB(parseInt(255*rgb.red(),10), parseInt(255*rgb.green(),10), parseInt(255*rgb.blue(),10), run);
      } else {
        globals.blink.fadeToRGB(time*1000, parseInt(255*rgb.red(),10), parseInt(255*rgb.green(),10), parseInt(255*rgb.blue(),10), index, run);
      }
    }
    globals.blink.rgb(function(r, g, b) {
      currentColor = [r, g, b];
      run();
    });
  },
  patterns: [
    {
      "date": 1422609576,
      "name": "EKG",
      "pattern": "5,#0c4f00,0,0,#29ff00,0,0,#0c4f00,0.1,0,#29ff00,0.1,0,#0c4f00,2.1,0",
      "readonly": false,
      "repeats": 5,
      "system": false
    },
    {
      "name": "calmdown",
      "pattern": "3,#00ff33,2,1,#ff00e9,2,2,#ff0004,2,1,#003fff,2,2,#faff00,2,1,#ffffff,2,1",
      "repeats": 3
    },
    {
      "date": 1422609561,
      "name": "dancefloor",
      "pattern": "6,#ff0004,0.1,1,#ff0004,0.1,2,#f2ff00,0.1,1,#f2ff00,0.1,2,#00ff37,0.1,1,#00ff2a,0.1,2,#ff00aa,0.1,1,#ff00b6,0.1,2",
      "readonly": false,
      "repeats": 6,
      "system": false
    },
    {
      "date": 1422609566,
      "name": "emergency",
      "pattern": "3,#ff7c01,0,2,#732f00,0.1,0,#ff7e00,0,1,#602700,0.3,1",
      "readonly": false,
      "repeats": 3,
      "system": false
    },
    {
      "date": 1422535729,
      "name": "policecar",
      "pattern": "6,#ff0000,0.3,1,#0000ff,0.3,2,#000000,0.1,0,#ff0000,0.3,2,#0000ff,0.3,1,#000000,0.1,0",
      "readonly": false,
      "repeats": 6,
      "system": false
    },
    {
      "date": 1422609570,
      "name": "rave",
      "pattern": "6,#8b8800,0,0,#010b9e,0.1,0,#009b00,0.1,0,#a5008c,0.1,0,#01998e,0.1,0,#9b0007,0.1,0,#0114a5,0.1,0,#8c8d85,0.1,0",
      "readonly": false,
      "repeats": 6,
      "system": false
    }
  ],
  screen: null,
  blink: null,
  prio: 0
};

module.exports = globals;
