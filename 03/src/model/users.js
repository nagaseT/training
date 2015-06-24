var fs = require('fs');
var Sequelize = require('sequelize');
var db = 'mysql://root:password@10.63.82.28:3306/nagase';
var sequelize = new Sequelize(db);

var Users = sequelize.define('users', {
  id: Sequelize.INTEGER,
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  timestamps: false
});

module.exports.login = function login(username, password) {
  return sequelize.sync().then(function(result) {
    return Users.findOne({ where: {username: username} });
  }).then(function(users){
    if (users.password === password) {
      return true;
    }
      return false;
  }).catch(function(err) {
    return err;
  });
}


/*
module.exports.login = function login(username, password) {
  return new Promise(function(resolve, reject) {
    fs.readFile('users.json', { encoding: 'utf-8' }, function(err, data) {
      if(err) {
        return reject(err);
      }

      resolve(data);
    });
  }).then(function(data) {
    var users = JSON.parse(data);
    return users;
  }).then(function(users) {
    if (users[username] === password) {
      return true;
    }

    return false;
  });
};
*/
/*
module.exports.login('soned', 'aaaaaa').then(function(result) {
  console.log(result); // true
}).catch(function(err) {
  console.log('!!!!!!!!!!!!!!!!!!!ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.log(err);
});
*/

/*

var db = new DB();  // クラスを作る
db.connect().then(function() {
  return db.login();  // promiseの関数作る
}).then(function(result) {
  console.log(result); // true/false
}).catch(function(err) {
  console.log(err);
});

*/