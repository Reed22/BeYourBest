const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');
const bcrypt = require('bcrypt');

const users = [];


router.get('/create-account', function(req, res, next){
      res.render('create-account');
});

router.post('/create-account', function(req,res,next){
      console.log(req.body.password)
      try {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                  users.push({
                        id: Date.now().toString(),
                        name: req.body.fname,
                        email: req.body.email,
                        password: hash
                  })
                  console.log(users);
                  res.redirect('/login')
            });
      } catch {
            res.redirect('/create-account');
      }
})

module.exports = router