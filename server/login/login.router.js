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
      req.session.isAdmin = user.isAdmin;
      req.session.userId = user.id;
      res.sendStatus(200);
    }
  }).catch(next);

});

router.get('/logout', function(req, res, next) {
  req.session.isAdmin = null;
  req.session.userId = null;
  res.sendStatus(200);
})




module.exports = router;
