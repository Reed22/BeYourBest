const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');

router.get('/delete-class', function(req, res, next){
    var queryString = `DELETE FROM classMembers ` +
                      `WHERE classId = ${req.query.id};`
    mysql.pool.query(queryString, function(err, result){
      if(err){
        next(err);
        return;
      }
    });
    var queryString = `DELETE FROM classes ` +
                      `WHERE classId = ${req.query.id};`
    mysql.pool.query(queryString, function(err, result){
      if(err){
        next(err);
        return;
      }
      res.render('classes');
    });
  });

module.exports = router