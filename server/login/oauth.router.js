'use strict';

var router = require('express').Router();
var User = require('../api/users/user.model');
var passport = require('passport');



router.get('/auth/google', passport.authenticate('google', {scope: 'email'}));

router.get('/auth/google/callback', passport.authenticate('google', {

  failureRedirect: '/users'
}), function(req, res, next){
  req.login(req.user, function(err){
    if(err) console.log(err);
    else {
      res.redirect('/stories');
    }
  });


});


module.exports = router;

