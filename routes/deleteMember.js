const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');

router.get('/deleteMember', function(req, res, next){
    var queryString = `DELETE FROM classMembers ` +
                      `WHERE classMembers.memberId = ${req.query.id};`
    mysql.pool.query(queryString, function(err, result){
      if(err){
        next(err);
        return;
      }
    });
    var queryString = `DELETE FROM members ` +
                      `WHERE members.memberId = ${req.query.id};`
    mysql.pool.query(queryString, function(err, result){
      if(err){
        next(err);
        return;
      }
      res.render('members');
    });
});

module.exports = router;