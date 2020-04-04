const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/members', function(req, res, next) {
    var context = {};
    if(req.query.search) {
        var search = req.query.search.split(' ');
        if(search[1]){
          var queryString = `SELECT members.memberId, members.firstName, members.lastName, members.email, ` +
                          `trainers.firstName AS trainerFirstName, trainers.lastName AS trainerLastName ` +
                          `FROM members LEFT JOIN trainers ON members.trainerID = trainers.trainerId ` +
                          `WHERE members.firstName = '${search[0]}' AND members.lastName = '${search[1]}'`;
        }
        else {
          var queryString = `SELECT members.memberId, members.firstName, members.lastName, members.email, ` +
                          `trainers.firstName AS trainerFirstName, trainers.lastName AS trainerLastName ` +
                          `FROM members LEFT JOIN trainers ON members.trainerID = trainers.trainerId ` +
                          `WHERE members.firstName = '${search[0]}' OR members.lastName = '${search[0]}'`;
        }
    }
    else {
        var queryString = "SELECT members.memberId, members.firstName, members.lastName, members.email, " +
                          "trainers.firstName AS trainerFirstName, trainers.lastName AS trainerLastName " +
                          "FROM members LEFT JOIN trainers ON members.trainerId = trainers.trainerId ";
    }

    mysql.pool.query(queryString, function(err, rows, fields) {
      if(err) {
        next(err);
        return;
      }
      var members = [];
      for(var p in rows) {
        members.push({
          "id": rows[p].memberId,
          "fName": rows[p].firstName,
          "lName": rows[p].lastName,
          "email": rows[p].email,
          "advisor": rows[p].trainerFirstName ? (rows[p].trainerFirstName + " " + rows[p].trainerLastName) : "None"
        });
      }
      context.members_list = members;

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

        res.render('members', context);
      });
    });
});

router.post('/members', function(req, res, next) {
    var context = {};
    if(req.body.trainer == "None") {
      var queryString = `INSERT INTO members (firstName, lastName, email, joinDate, paidDues) VALUES (?,?,?,?,?)`;
      var parameters = [req.body.fname, req.body.lname, req.body.email, req.body.join_date, req.body.dues];
    }
    else {
      var queryString = `INSERT INTO members (firstName, lastName, email, joinDate, trainerId, paidDues) VALUES (?,?,?,?,?,?)`;
      var parameters = [req.body.fname, req.body.lname, req.body.email, req.body.join_date, req.body.trainer, req.body.dues];
    }
    mysql.pool.query(queryString, parameters, function(err, rows, fields) {
        if(err) {
          next(err);
          return;
        }
    res.redirect('/members');
    });
});


module.exports = router;