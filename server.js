var express = require('express'),
    Db = require('./api/config/database'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    flash = require('connect-flash');

var app = express();

app.set('views', 'client');
app.set('view engine', 'pug');

app.use(cookieParser('test'))
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'test',
  cookie: {
    maxAge: 60000
  }}
));
app.use(flash());


passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    Db.User.findOne({ email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      if ( !user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password'})
      }
      return done(null, user);
    })
  })
)

debugger
require('./api/routes.js')(app, Db, passport);

app.listen(3000);

console.log('Node.js running on :3000');