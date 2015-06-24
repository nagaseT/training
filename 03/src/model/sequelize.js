var Sequelize = require('sequelize');


var db = 'mysql://root:password@10.63.82.28:3306/nagase';
var sequelize = new Sequelize(db);
/*
var db = 'mysql://y.ucs.ricoh.co.jp:3306/nagase';
var user = 'root';
var pass = 'password';
var sequelize = new Sequelize(db, user, pass);
*/

var Users = sequelize.define('users', {
  id: Sequelize.INTEGER,
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  timestamps: false
});

sequelize.sync().then(function(result) {
  var user = Users.build({
    username: 'fooo',
    password: 'baar'
  });
  return user.save();
}).then(function() {
  return Users.findAll();
}).then(function(users) {
  var userSavePromsise = users.map(function(user) {
    user.password = user.password + '@@@';
    return user.save();
  });
  return Promise.all(userSavePromsise);
}).then(function(users) {
  users.forEach(function(row) {
    var user = row.get({ plan: true });
    console.log(user);
  });
  return users; // return でデータを返すと、次のthenに渡せる
}).then(function(users) {
  var userDestroyPromsise = users.map(function(user) {
    return user.destroy();
  });
  return Promise.all(userDestroyPromsise);
}).then(function() {
  return Users.findAll();
}).then(function(users) {
  console.log(users.length);
}).catch(function(err){
  console.log(err);
});