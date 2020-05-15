const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');

router.get('/', function(req, res, next) {
    var context = {};
    var queryString = 'SELECT classId, className, timeOfClass FROM classes';
    var classes = [];
    mysql.pool.query(queryString, function(err, rows, fields) {
      if(err) {
        next(err)
        return;
      }
      var counter = 4;
      if(rows.length < 4)
        counter = rows.length;

      for(let p = 0; p < counter; p++) {
          var date = JSON.stringify(rows[p].timeOfClass).slice(1, 10).split('-');
          var newDate = `${date[1]}-${date[2]}-${date[0]}`;

          var time = JSON.stringify(rows[p].timeOfClass).slice(12, 20).split(":");
          var hours = time[0] > 12 ? time[0] - 12 : JSON.stringify(time[0]).slice(2,3);
          var minutes = time[1];
          var meridiem = time[0] > 12 ? 'PM' : 'AM';
          var newTime = `${hours}:${minutes} ${meridiem}` 
          
          classes.push({
            "id": rows[p].classId,
            "name": rows[p].className,
            "date": newDate,
            "time": newTime
          })
      }
      context.class_list = classes;
      res.render('home', context);
    });
});

module.exports = router