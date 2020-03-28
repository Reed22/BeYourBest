const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');

router.get('/deleteEquipment', function(req, res, next){
    var queryString = `DELETE FROM equipment ` +
                      `WHERE equipment.equipmentId= ${req.query.id};`
    mysql.pool.query(queryString, function(err, result){
      if(err){
        next(err);
        return;
      }
      res.render('equipment');
    });
  });

  module.exports = router;