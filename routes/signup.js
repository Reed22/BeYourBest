const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/signup', function(req, res, next) {
    var context = {"classId": req.query.id};
    var queryString = `SELECT classId, className FROM classes`;
    mysql.pool.query(queryString, function(err, rows, fields) {
        if(err) {
         next(err);
         return;
        }
        var classes = [];
        for(var p in rows) {
          classes.push({
            "id": rows[p].classId,
            "name": rows[p].className
          });
        }
        context.class_list = classes;
  
        var members = []
        queryString = `SELECT memberId, firstName, lastName FROM members`;
        mysql.pool.query(queryString, function(err, rows, fields) {
            if(err) {
            next(err);
            return;
            }
            for(var p in rows){
              members.push({
                "id": rows[p].memberId,
                "first": rows[p].firstName,
                "last": rows[p].lastName
              });
            }
            context.enroll_list = members;
            res.render('signup', context);
        });
    });
  });
  
router.post('/signup', function(req, res, next) {
    var queryString = `SELECT * FROM classMembers WHERE classId = ${req.body.Class} AND memberId = ${req.body.Member}`;
    mysql.pool.query(queryString, function(err, rows, fields) {
      if(err){
        next(err);
        return;
      }

      if(rows.length != 0) {
        res.redirect('/classes?duplicate=true');
      }
      
      else {
        queryString = `INSERT INTO classMembers (classId, memberId) VALUES (?,?)`
        var parameters = [req.body.Class, req.body.Member];
        mysql.pool.query(queryString, parameters, function(err, rows, fields) {
          if(err){
            next(err);
            return;
          }
          res.redirect('/classes');
        });
      }
  });
});

module.exports = router;