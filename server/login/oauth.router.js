'use strict';

var router = require('express').Router();
var User = require('../api/users/user.model');
var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
  new GoogleStrategy({
    clientID: '831943941198-1i0h72r8evlia7ifbpdpd41o2goetqpg.apps.googleusercontent.com',
    clientSecret: 'jUDm62V8E6_3pvdpVECJjN1v',
    callbackURL: '/auth/google/callback'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
    /*
    --- fill this part in ---
    */
    console.log('---', 'in verification callback', profile, '---');
    done();
  })
);

router.get('/auth/google', passport.authenticate('google', {scope: 'email'}));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}));


module.exports = router;

