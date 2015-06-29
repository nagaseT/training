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

// 1. register できなかった -> 失敗ととらえ
// user がすでにいたら Error を作って reject する
//
// 2. select -> insert の間に他の人に insert されたら？
//    1. transaction を使う
//    2. insert の正否で存在の有無を確認(user が unique な場合)
DB.prototype.register = function(username, password) {
  var self = this;  // thenの中でthisが参照できないので、selfを定義する必要がある
  var isRegister = true; // 不要?
  return self.Users.findOne({ where: {username: username}
  }).then(function(user) {
    if (user) {
      var isRegister = false;
      return isRegister;
    }
      var saveUser = self.Users.build({
        username: username,
        password: password
      });
      return saveUser.save(); // 同じ Promise のリターンの型が違う(Promise / boole)ので、そろえた方が良い
  }).then(function(isRegister) {
    if (isRegister === undefined) { // ここで取り分ける必要
      return true;
    }
    return isRegister;
  });
}


DB.prototype.getAllUser = function() {
  // DBに登録されている全てのユーザを取得し、返す
  var self = this;
  return self.Users.findAll().then(function(users){
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
