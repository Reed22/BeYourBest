const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/trainers', function(req, res, next) {
    var context = {};
    mysql.pool.query('SELECT trainerId, firstName, lastName, startOfShift, endOfShift FROM trainers', function(err, rows, fields) {
      if(err) {
        next(err);
        return;
      }
      var parameters = [];
      for(var p in rows) {
        parameters.push({
          "id": rows[p].trainerId,
          "fName": rows[p].firstName,
          "lName": rows[p].lastName,
          "startTime": rows[p].startOfShift,
          "endTime": rows[p].endOfShift
        });
      }
      context.trainer_list = parameters;
      res.render('trainers', context);
      });
  });
  
router.post('/trainers', function(req,res,next) {
    var parameters = [req.body.fname, req.body.lname, req.body.start_shift, req.body.end_shift];
    var queryString = "INSERT INTO trainers (firstName, lastName, startOfShift, endOfShift) VALUES (?,?,?,?)";
    mysql.pool.query(queryString, parameters, function(err, rows, fields) {
           if(err) {
            next(err);
            return;
           }
       res.redirect('/trainers');
    });
  });

module.exports = router;