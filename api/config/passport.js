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
      usernameField: 'email'
    },
    function(email, password, done) {
      var user = new UserModel({email: email});
      if (!user.user) {
        console.log('Invalid User.');
        return done({ message: 'Invalid User' });
      }
      if (!user.validPassword(password)){
        console.log('Invalid password.');
        return done({ message: 'Invalid Password' });
      }
      if (!user.user.isActive) {
        console.log('Your account has been suspended.');
        return done({ message: 'Your account has been suspended' });
      }
      return done(null, user.user);
    }));

};