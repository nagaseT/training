let Sequelize = require('sequelize');

class DB {

  constructor(dbUri) {
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

  connect() {
    return this.sequelize.sync();
  }

  login(username, password) {
    return this.Users.findOne({ where: {username}
    }).then((user) => {
      if (!user) {
        return false;
      }
      if (user.password !== password) {
        return false;
      }
      return true;
    });
  }

  register(username, password) {
    let saveUser = this.Users.build({ username, password });
    return saveUser.save();
  }


  getAllUser() {
    return this.Users.findAll({order : "username"})
    .then((users) => {
      let usersArr = users.map((user) => user.get({ plain: true }));
      return usersArr;
    });
  }

}

module.exports = DB;  // コンストラクタを入れている

/*
let db = new DB();  // クラスを作る
db.connect().then(function() {
  return db.login('soneda', 'aaaaaa');  // promiseの関数作る
}).then(function(result) {
  console.log(result); // true/false
}).catch(function(err) {
  console.log(err);
});
*/
/*
let db = new DB('mysql://root:password@10.63.82.28:3306/nagase');  // クラスを作る
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