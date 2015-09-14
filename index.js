var os = require('os'),
    globals = require('./globals'),
    blessed = require('blessed'),
    Blink1 = require('node-blink1'),
    blink = globals.blink = new Blink1();

var screen = globals.screen = blessed.screen();

require('./schedules')();

if (os.platform() == "darwin") {
  require('./osx')();
}

var box = blessed.box({
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: {
      fg: '#eee'
    }
  }
});

screen.append(box);

screen.on('resize', function() {
  screen.render();
  blessed.log("What what");
});

screen.key(['C-c'], function(ch, key) {
  return process.exit(0);
});

var options = blessed.list({
  keys: true,
  mouse: true,
  border: {
    type: 'line'
  },
  items: ["Set status to Available","Set status to Busy","Set status to Away","Start Pomodoro"],
  top: 'center',
  left: 'center',
  width: 40,
  height: 6,
  selectedBg: "#fff",
  selectedFg: "#000"
});

options.on('select', function(e) {
  switch (e.content) {
    case "Set status to Available":
      globals.prio = 0;
      blink.setRGB(0,255,0);
    break;
    case "Set status to Busy":
      globals.prio = 5;
      blink.setRGB(255,0,0);
    break;
    case "Set status to Away":
      globals.prio = 5;
      blink.setRGB(255,255,0);
    break;
    case "Start Pomodoro":
      require('./pomodoro')();
    break;
    default:
    break;
  }


});

box.append(options);
options.focus();

screen.render();
