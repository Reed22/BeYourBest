const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/update-inspection', function(req, res, next){
  var queryString = `SELECT trainerId, firstName, lastName FROM trainers`;
  var context = {"equipmentId": req.query.id};
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
    queryString = `SELECT equipmentName, inspectedBy, inspectionDate, passedInspection FROM equipment `+
                  `WHERE equipmentId = ${req.query.id}`;
    mysql.pool.query(queryString, function(err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      context.equipment = rows[0];
      context.equipment.id = req.query.id
      if(context.equipment.inspectedBy == null) {
        context.equipment.trainerName = 'None';
      }
      else {
        for(var p in trainers){
          if(trainers[p].id == context.equipment.inspectedBy) {
              context.equipment.trainerName = trainers[p].first + " " + trainers[p].last
              trainers.splice(p, 1);
          }
        }
      }
      context.equipment.inspectionDate = rows[0].inspectionDate.toISOString().slice(0,10);
      res.render('updateInspection', context);
    });
  });
});

router.post('/update-inspection', function(req, res, next) {
  var queryString = `UPDATE equipment SET inspectionDate = '${req.body.inspection_date}', `+
                    `inspectedBy = ${req.body.inspector}, `+
                    `passedInspection = ${req.body.passed_inspection} `+
                    `WHERE equipmentId = ${req.body.equipmentId}`;
  mysql.pool.query(queryString, function(err, result) {
    if(err) {
      next(err);
      return;
    }
    res.redirect('/equipment');
  });

});

module.exports = router;