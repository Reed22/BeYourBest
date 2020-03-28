const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/classes', function(req, res, next) {
    var context = {};
    if(req.query.duplicate) {
      context.duplicate = true;
    }
    
    var queryString = "SELECT classId, className, capacity, timeOfClass, firstName, lastName FROM classes " +
                      "LEFT JOIN trainers ON classes.trainerId = trainers.trainerId";
    mysql.pool.query(queryString, function(err, rows, fields) {
        var classes = []
        for(var p in rows) {
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
               "instructor": rows[p].firstName + " " + rows[p].lastName,
               "cap": rows[p].capacity,
               "date": newDate,
               "time": newTime
            })
        }
        context.class_list = classes;
        queryString = "SELECT trainerId, firstName, lastName FROM trainers";
        mysql.pool.query(queryString, function(err, rows, fields) {
            if(err) {
              next(err);
              return;
            }
            var trainers = [];
            for(var q in rows) {
              trainers.push({
                "id": rows[q].trainerId,
                "first": rows[q].firstName,
                "last": rows[q].lastName
              });
            }
            context.trainer_list = trainers;

            res.render('classes', context);
        });
    });
});

router.post('/classes', function(req, res, next) {
    var queryString = `INSERT INTO classes (className, trainerId, capacity, timeOfClass) VALUES (?, ?, ?, ?)`;
    var parameters = [req.body.name, req.body.instructor, req.body.capacity, req.body.date_time];

    mysql.pool.query(queryString, parameters, function(err, rows, fields) {
        if(err) {
          next(err);
          return;
        }

        res.redirect('/classes');
    });
});


module.exports = router