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
  }).then(function(user){
    if (!user) {
      return false;
    }
    if (user.password !== password) {
      return false;
    }
    return true;
  });
}
/*
DB.prototype.register = function(params) {
  // paramsからusernameなどを取り出し、登録する
  // （できたら）usernameが被っている場合はエラーとする
}

DB.prototype.getAllUser = function() {
  // DBに登録されている全てのユーザを取得し、返す
}
*/
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