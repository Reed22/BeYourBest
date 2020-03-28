const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/equipment', function(req, res, next) {
    var context = {};
    var queryString = "SELECT equipmentId, equipmentName, inspectionDate, passedInspection, firstName, lastName FROM equipment " +
                      "LEFT JOIN trainers ON equipment.inspectedBy = trainers.trainerId";
    mysql.pool.query(queryString, function(err, rows, fields) {
        if(err) {
          next(err);
          return;
        }

        var equipment = [];
        for(var p in rows) {
          equipment.push({
            "id": rows[p].equipmentId,
            "name": rows[p].equipmentName,
            "inspect_date": JSON.stringify(rows[p].inspectionDate).slice(1, 11),
            "inspector": rows[p].firstName + " " + rows[p].lastName,
            "passed": (rows[p].passedInspection ? "Yes" : "No")
          });
        }
        context.equipment_list = equipment;

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

        res.render('equipment', context);
        });
    });
});

router.post('/equipment', function(req, res, next) {
    var queryString = `INSERT INTO equipment (equipmentName, installationDate, inspectionDate, inspectedBy, passedInspection) ` +
                      `VALUES (?,?,?,?,?)`;
    var parameters = [req.body.name, req.body.install_date, req.body.inspection_date, req.body.inspector, req.body.passed_inspection];
    mysql.pool.query(queryString, parameters, function(err, rows, fields) {
       if(err) {
         next(err);
         return;
       }
       res.redirect('/equipment');
    });
});

module.exports = router;