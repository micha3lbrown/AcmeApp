const db = require('../config/database')

function User(user) {
  this.db = db('users')
  this.user = db('users').find(user);
}

function verifyParams(req) {
  var validParams = ['name', 'age', 'eyeColor', 'company', 'email', 'address', 'phone'],
      obj = {};

  for (var i = validParams.length - 1; i >= 0; i--) {
    var key = validParams[i];
    obj[key] = req[key];
  }

  user = mergeUser(obj);
  return user;
}

function mergeUser(obj) {
  var user = this.user;
  for (var attr in obj) {
    user[attr] = obj[attr];
  }
  return user;
}

User.prototype.findById = function(id) {
  return this.db.find( {_id: id } )
};

User.prototype.validPassword = function(password) {
  return this.user.password === password
};

User.prototype.save = function(req) {
  var user = verifyParams(req);
  this.user = this.db.chain().find({_id: req.user}).assign(user).value();
  return this.user;
};

module.exports = User;