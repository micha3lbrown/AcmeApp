UserModel = require('./models/User');

var User = new UserModel,
    id = '5410953eb0e0c0ae25608277',
    id2 = '5410953eee9a5b30c3eea476';

module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('index.pug');
  });

  app.get('/login', function(req, res){
    res.render('login.pug');
  })

  // app.post('/login', function(req, res, done){
  //   passport.authenticate('local', function(err, user) {
  //     if(err) { return res.redirect('/login', { message: err }); }
  //     return res.redirect('/profile')
  //   })(req, res, done);
  // })
  app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/profile',
    failureFlash: true
  }), function(req, res){
    // console.log(res.l);
    res.redirect('/login', {req});
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.post('/profile', isLoggedIn, function(req, res){
    var user = User.save(req.body);
    res.render('profiles/show', { user });
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    var user = User.findById(req.user);
    res.render('profiles/show.pug', { user });
  });

  app.get('/profile/edit', isLoggedIn, function(req, res) {
    var user = User.findById(req.user);
    res.render('profiles/edit.pug', { user });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }

}