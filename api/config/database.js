const low = require('lowdb'),
      storage = require('lowdb/file-sync'),
      db = low('data/users.json', { storage });



module.exports.Users = db('users');

module.exports.Users.validPassword = function(user, password) {
  console.log(user.password === password);
  return user.password === password;
}


