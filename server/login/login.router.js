'use strict';

var router = require('express').Router();
var User = require('../api/users/user.model');

router.post('/login', function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;



  User.findOne({
    where: req.body
  }).then(function(user){
    if(!user){
      res.sendStatus(401);
    } else {
      req.login(user, function (err){
        if(err) console.log(err);
        res.json(user);
      });

    }
  }).catch(next);

});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.sendStatus(200);
})

router.get('/auth/me', function(req, res, next) {
  if (!req.session.userId) {
    res.redirect('/login');
  } else {
    res.redirect('/users/' + req.user.id);
  }
});

router.get('/status', function(req, res, next) {
  if (!req.user) {
    res.json({loggedIn: false});
  } else {
    res.json({loggedIn: true});
  }
});




module.exports = router;
