const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/updateClass', function(req,res, next) {

    var queryString = `SELECT trainerId, firstName, lastName FROM trainers`;
    var context = {"classId": req.query.id};
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
      queryString = `SELECT className, trainerId, timeOfClass, capacity FROM classes `+
                    `WHERE classId = ${req.query.id}`;
      mysql.pool.query(queryString, function(err, rows, fields) {
        if (err) {
          next(err);
          return;
        }
        context.class = rows[0];
        const timeOfClass = new Date(rows[0].timeOfClass);
        context.class.timeOfClass = timeOfClass.toISOString().slice(0,16);
        res.render('updateClass', context);
      });
    });
  });
  
router.post('/updateClass', function(req, res, next) {
    var queryString = `UPDATE classes SET trainerId = ${req.body.instructor}, `+
                      `capacity = ${req.body.new_capacity}, ` +
                      `timeOfClass = '${req.body.new_time}' ` +
                      `WHERE classId = ${req.body.classId}`;
  
    mysql.pool.query(queryString, function(err, result) {
      if(err) {
        next(err);
        return;
      }
      res.redirect('/classes');
    });
});

  module.exports = router;