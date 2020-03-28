const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/deleteTrainer', function(req, res, next){
    var queryString = `DELETE FROM trainers ` +
                      `WHERE trainers.trainerId = ${req.query.id};`
    mysql.pool.query(queryString, function(err, result){
      if(err){
        next(err);
        return;
      }
      res.render('trainers');
    });
  });

module.exports = router;