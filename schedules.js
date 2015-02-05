var schedule = require('node-schedule'),
    g = require('./globals');

module.exports = function() {

  var rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, 1, 2, 3, 4];
  rule.hour = [10, 15];
  rule.minute = 00;

  var j = schedule.scheduleJob(rule, function(){
      g.playPattern("rave");
  });

};