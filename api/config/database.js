const low = require('lowdb'),
      storage = require('lowdb/file-sync'),
      db = low('data/users.json', { storage }, true);

module.exports = db;