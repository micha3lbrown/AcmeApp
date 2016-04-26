var express = require('express'),
    session = require('express-session'),
    Db = require('./api/config/database'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    flash = require('connect-flash')
    port = 5555;

var app = express();

app.set('views', 'client');
app.set('view engine', 'pug');

require('./api/config/passport')(passport, Db);

app.use(express.static('public'));
app.use(cookieParser('test'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'test',
  cookie: {
    maxAge: 60000
  }}
));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./api/routes.js')(app, passport);

app.listen(port);

console.log('Node.js running on :', port);