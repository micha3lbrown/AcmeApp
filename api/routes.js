var UserModel = require('./models/User');

var User = new UserModel;

module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    var message = req.flash('loginMessage')
    res.render('index.pug', { message });
  });

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true
  }));

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    var user = User.findById(req.user);
    res.render('profiles/show.pug', { user });
  });

  app.get('/profile/edit', isLoggedIn, function(req, res) {
    var user = User.findById(req.user);
    res.render('profiles/edit.pug', { user });
  });

  app.post('/profile', isLoggedIn, function(req, res){
    var user = User.save(req.body);
    res.render('profiles/show', { user });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }

}