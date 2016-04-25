module.exports = function(app, Db, passport) {

  app.get('/', function(req, res) {
    const users = Db.Users.toArray();
    res.render('index.pug', { users });
  });

  app.get('/login', function(req, res) {
    res.render('login.pug', { message: req.flash('loginMessage') });
  });

  app.get('/signup', function(req, res) {
    res.render('signup.pug', { message: req.flash('loginMessage') });
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.pug', {
      user : req.user
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/');

  }

}