module.exports = function(app, passport, Db) {

  app.get('/', function(req, res) {
    res.render('index.pug');
  });

  app.get('/login', function(req, res) {
    res.render('login.pug', { message: req.flash('loginMessage') });
  });

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/signup', function(req, res) {
    res.render('signup.pug', { message: req.flash('loginMessage') });
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    profile = Db.Users.find( {_id: req.user } );
    res.render('profile.pug', {
      user : profile
    });
  });


  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }

}