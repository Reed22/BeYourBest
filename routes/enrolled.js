const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');

router.get('/enrolled', function(req, res, next) {
    var context = {};
    var enrolled = []
    var queryString = `SELECT classes.className, members.firstName, members.lastName FROM members ` +
                      `INNER JOIN classMembers ON members.memberId = classMembers.memberId ` +
                      `INNER JOIN classes ON classes.classId = classMembers.classId ` +
	              `WHERE classes.classId = ${req.query.id}`;
    mysql.pool.query(queryString, function(err, rows, fields) {
        if(err) {
         next(err);
         return;
        }
        for(var p in rows){
           enrolled.push({
             "first": rows[p].firstName,
             "last": rows[p].lastName
           });
        }
        context.className = rows[0].className;
	      context.enrolled_list = enrolled;
        res.render('enrolled', context);
    });
});

module.exports = router