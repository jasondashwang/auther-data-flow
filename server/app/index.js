'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');

var idleTimeoutSeconds = 180;

app.use(session({
  resave: true,
  secret: '@hello123',

  cookie: {
    maxAge: idleTimeoutSeconds * 1000
  },

  rolling: true

}));


app.use('/', function (req, res, next) {

  console.log('session', req.session);
  next();
});


app.use(require('./logging.middleware'));

app.use(require('./request-state.middleware'));

app.use(require('./statics.middleware'));

app.use('/', require('../login/login.router'));

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
