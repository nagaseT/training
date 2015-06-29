var user_data = [
  { username: 'soneda' , password: 'aaaaaa'},
  { username: 'b' , password: 'b@@'},
  { username: 'c' , password: 'c@@'},
  { username: 'd' , password: 'd@@'},
  { username: 'e' , password: 'e@@'},
  { username: 'nagase' , password: 'aaaaaa'},
]

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

/*
  1. データベースを全て消す
  2. user_dataを追加する
  3. 追加されているか確認する
*/
sequelize.sync().then(function(result) {
  // まずはデータベースのデータを取得する
  return Users.findAll();
}).then(function(users) {
  // 登録されている確認する
  users.forEach(function(row) {
    var user = row.get({ plain: true });
    console.log(user);
  });
  return users;
}).then(function(users) {
  // 1. データベースを全て消す
  var userDestroyPromsise = users.map(function(user) {
    return user.destroy();
  });
  return Promise.all(userDestroyPromsise);
}).then(function() {
  // 2. user_dataを追加する
  var userSavePromise = user_data.map(function(user) {
    var saveUser = Users.build({
      username: user.username,
      password: user.password
    });
    return saveUser.save();
  });
  return Promise.all(userSavePromise);
}).then(function(users) {
  // 3. 追加されているか確認する
  users.forEach(function(row) {
    var user = row.get({ plan: true });
    console.log(user);
  });
}).catch(function(err){
  console.log(err);
});