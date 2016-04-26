var LocalStrategy = require('passport-local').Strategy,
    UserModel = require('../models/User');

var User = new UserModel;

module.exports = function(passport, Db) {

  passport.serializeUser(function(user, done){
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done){
    user = User.findById(id);
    if (!user) {
      return(done({message: 'Invalid User Id'}, null));
    }
    done(null, user._id);
  });

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      var user = new UserModel({email: email});
      if (!user.user) {
        return done(null, false, req.flash('loginMessage', 'Invalid User'));
      }
      if (!user.validPassword(password)){
        return done(null, false, req.flash('loginMessage', 'Invalid Password'));
      }
      if (!user.user.isActive) {
        return done(null, false, req.flash('loginMessage', 'Suspended Account'));
      }
      return done(null, user.user);
    }));

};