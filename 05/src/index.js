var Express = require('express');
var BodyParser = require('body-parser');
var app = Express();

var Config = require('./../config');

var DataBase = require('./model/db'); // db.jsのコンストラクタ(DB())が入る
var db = new DataBase(Config.config.mysql);

// setting
// レンダリングするファイルの置き場所
app.set('views', __dirname + '/views');
// レンダリングエンジンにはejsを使う宣言
app.set('view engine', 'ejs');

app.use(BodyParser.urlencoded({extended: true}));


// routing(req -> res)

// ログイン画面
app.get('/login_form', function(req, res) {
  res.render('login_form');
});

// ユーザ登録画面
app.get('/registration_form', function(req, res) {
  res.render('registration_form');
});

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  db.connect().then(function() {
    return db.login(username, password);
  }).then(function(result) {
    if (!result) {
      // 画面遷移せず、エラーを出すように変更
      return res.send('NG');
    }
    // ログイン成功画面を表示するように変更する
    return res.send('OK');
  }).catch(function(err) {
    // 画面遷移せず、エラーを出すように変更
    return res.send('NG');
  });

});

module.exports.app = app;