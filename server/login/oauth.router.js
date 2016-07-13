'use strict';

var router = require('express').Router();
var User = require('../api/users/user.model');
var passport = require('passport');



router.get('/auth/google', passport.authenticate('google', {scope: 'email'}));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/stories',
  failureRedirect: '/users'
}));


module.exports = router;

