var Sequelize = require('sequelize');
function DB () {
  this.dbUri = 'mysql://root:password@10.63.82.28:3306/nagase';
  this.sequelize = new this.Sequelize(this.dbUri);
  this.Users = this.sequelize.define('users', {
      id: this.Sequelize.INTEGER,
      username: this.Sequelize.STRING,
      password: this.Sequelize.STRING
    }, {
      timestamps: false
    });
}

DB.prototype.connect = function() {
  return this.sequelize.sync();
}

DB.prototype.login = function(username, password) {
  return this.Users.findOne({ where: {username: username}
  }).then(function(users){
    if (users.password === password) {
      return true;
    }
      return false;
  }).catch(function(err) {
    return err;
  });
}

module.exports = DB;

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