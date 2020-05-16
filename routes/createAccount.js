const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');
const bcrypt = require('bcrypt');

//const users = [];


router.get('/create-account', function(req, res, next){
      res.render('create-account');
});

router.post('/create-account', function(req,res,next){
      console.log(req.body.password)
      try {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                  //INSERT INTO DB
                  console.log("Got here")
                  var queryString = 'INSERT into accounts (firstName, lastName, email, password) VALUES (?,?,?,?)'
                  var parameters = [req.body.fname, req.body.lname, req.body.email, hash]
                  mysql.pool.query(queryString, parameters, function(err,rows,fields) {
                      if(err) {
                        next(err)
                        return;
                      }
                      console.log("inside query")
                      res.redirect('/login')
                  })
                  /*
                  users.push({
                        id: Date.now().toString(),
                        name: req.body.fname,
                        email: req.body.email,
                        password: hash
                  })
                  console.log(users);
                  res.redirect('/login')
                  */
            });
      } catch {
            res.redirect('/create-account');
      }
})

module.exports = router