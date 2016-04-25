var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, Db) {

  passport.serializeUser(function(user, next){
    next(null, user._id);
  });

  passport.deserializeUser(function(id, next){
    user = Db.Users.find({ _id: id});
    if (!user) {
      return(next({message: 'Invalid User Id'}, null));
    }
    next(null, user._id);
  });

  passport.use(new LocalStrategy({
      // Changing username field to Email
      usernameField: 'email'
    },
    function(email, password, next) {
      var user = Db.Users.find({ email: email });
      if (!user) {
        return next({ message: 'Invalid User' }, null)
      }
      if (!Db.Users.validPassword(user, password)){
        return next({ message: 'Invalid Password' }, null)
      }
      return next(null, user)
    }));

};