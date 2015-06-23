var fs = require('fs');

module.exports.login = function login(username, password, callback) {
  fs.readFile(__dirname + '/users.json', {encoding: 'utf-8'}, function(err, data) {
    if (err) {
      return callback(err);
    }
    var users;
    try {
      users = JSON.parse(data); // ここが上げる例外を取得しコールバックへ
    } catch(e) {
      return callback(e);
    }
    if (users[username] === password) {
      return callback(null, true);
    }
    return callback(null, false);
  });
}

