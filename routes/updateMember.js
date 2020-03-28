const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/updateMember', function(req, res, next){
    var queryString = `SELECT trainerId, firstName, lastName FROM trainers`;
    var context = {"memberId": req.query.id};
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
      queryString = `SELECT firstName, lastName, email, joinDate, trainerId, paidDues FROM members `+
                    `WHERE memberId = ${req.query.id}`;
      mysql.pool.query(queryString, function(err, rows, fields) {
        if (err) {
          next(err);
          return;
        }
        context.member = rows[0];
        context.member.joinDate = rows[0].joinDate.toISOString().slice(0,10);
        res.render('updateMember', context);
      });
    });
  });
  
  router.post('/updateMember', function(req, res, next){
    var queryString = `UPDATE members SET members.firstName = ?, `+
                      `members.lastName = ?, `+
                      `members.email = ?, `+
                      `members.joinDate = ?, `+
                      `members.trainerId = ?, `+
                      `members.paidDues = ? `+
                      `WHERE memberId = ${req.body.memberId}`;
    var parameters = [req.body.fname, req.body.lname, req.body.email, req.body.join_date, req.body.advisor, req.body.dues]
    mysql.pool.query(queryString, parameters, function(err, result) {
      if(err) {
        next(err);
        return;
      }
      res.redirect('/members');
    });
  });
  
  module.exports = router;