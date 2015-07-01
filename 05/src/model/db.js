var Sequelize = require('sequelize');
function DB (dbUri) {
  this.sequelize = new Sequelize(dbUri);
  // define: オブジェクトの構造を定義できる
  this.Users = this.sequelize.define('users', {
      id: Sequelize.INTEGER,
      username: Sequelize.STRING,
      password: Sequelize.STRING
    }, {
      timestamps: false
    });
}

DB.prototype.connect = function() {
  return this.sequelize.sync();
}

DB.prototype.login = function(username, password) {
  return this.Users.findOne({ where: {username: username}
  }).then(function(user) {
    if (!user) {
      return false;
    }
    if (user.password !== password) {
      return false;
    }
    return true;
  });
}

DB.prototype.register = function(username, password) {
  var saveUser = this.Users.build({
    username: username,
    password: password
  });
  return saveUser.save();
}


DB.prototype.getAllUser = function() {
  return this.Users.findAll({order : "username"}).then(function(users){
    var usersArr = users.map(function(user) {
      return user.get({ plain: true });
    });
    return usersArr;
  })
}

module.exports = DB;  // コンストラクタを入れている

/*
var db = new DB();  // クラスを作る
db.connect().then(function() {
  return db.login('soneda', 'aaaaaa');  // promiseの関数作る
}).then(function(result) {
  console.log(result); // true/false
}).catch(function(err) {
  console.log(err);
});
*/
/*
var db = new DB('mysql://root:password@10.63.82.28:3306/nagase');  // クラスを作る
db.connect().then(function() {
  return db.register('nagase11', 'aaaaaa');  // promiseの関数作る
}).then(function(result) {
  console.log(result); // true/false
  return db.getAllUser();
}).then(function(arr) {
  console.log(arr);
}).catch(function(err) {
  console.log('error: ' + err);
});
*/