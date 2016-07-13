'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var User = require('../api/users/user.model');

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

app.use(passport.initialize());

app.use(passport.session());

app.use('/', require('../login/login.router'));

app.use('/', require('../login/oauth.router'));

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

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
    // console.log('---', 'in verification callback', profile, '---');

    var info = {
      name: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos ? profile.photos[0].value : undefined
    };

    console.log('we got to this point');


    User.findOrCreate({
      where: {
        googleId: profile.id
      },
      defaults: info
    })
    .spread(function(user) {
      done(null, user);
    })
    .catch(done);
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
  .then(function(user) {
    done(null, user);
  })
  .catch(function(err) {
    done(err);
  })
});


app.use(require('./error.middleware'));





module.exports = app;
