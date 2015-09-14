var g = require('./globals'),
    blessed = require('blessed');

module.exports = function() {

  var timeLeft = 25*60,
      pause = false;

  var box = blessed.BigText({
    keys: true,
    mouse: true,
    top: 'center',
    left: 'center',
    width: '80%',
    height: '80%',
    align: "center",
    valign: "middle",
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
  g.screen.append(box);
  box.setContent('25:00');
  g.playPattern("calmdown", -1);

  var pad = function(string) {
    return (new Array(2+1).join("0")+string).slice(-2);
  };

  var interval = setInterval(function() {
    timeLeft--;

    if (timeLeft == 0 && pause) {
      timeLeft = 25*60;
      pause = false;
      g.playPattern("calmdown", -1);
    } else if (timeLeft == 0 && !pause) {
      timeLeft = 5*60;
      pause = true;
      g.stopPattern();
    }

    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft - minutes * 60;

    box.setContent(pad(minutes)+':'+pad(seconds));
    g.screen.render();

  }, 1000);

      box.key('escape', function(ch, key) {
        g.stopPattern();
        clearInterval(interval);
        g.screen.remove(box);
        g.screen.render();
      });
  box.focus();
  g.screen.render();
};
