const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');

router.get('/test', function(req, res, next){
    console.log("hey");
    var queryString = `SELECT * FROM trainers`;
    mysql.pool.query(queryString, function(err, rows, fields) {
        if(err) {
          next(err);
          return;
        }
        console.log(rows);
    });
  });

  module.exports = router;