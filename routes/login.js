const express = require('express');
const router = express.Router();
const mysql = require('../dbcon.js');
const bcrypt = require('bcrypt');
const passport = require('passport')



router.get('/login', function(req, res, next){
      res.render('login');
});

router.post('/login', passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
  }))




module.exports = router