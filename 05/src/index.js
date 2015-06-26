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

app.use('/public', Express.static('public'));

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

// 成功画面
app.get('/success', function(req, res) {
  db.connect().then(function() {
    return db.getAllUser();
  }).then(function(resultArr) {
    res.render('success', { users: resultArr});
  });
});

// ログイン処理
app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  //connectする前にバリデーション入れる　★
  db.connect().then(function() {
    return db.login(username, password);
  }).then(function(result) {
    if (!result) {
      // ログイン画面に戻り、エラーを出すように変更
      // res.render('success', {message: 'ログインに失敗しました'});
      // エラー内容出す？
      return res.send('NG');
    }
    // ログイン成功画面を表示するように変更する
    return res.redirect('success');
    //return res.send('OK');
  }).catch(function(err) {
    // 画面遷移せず、エラーを出すように変更
    return res.send('NG');
  });
});

// ユーザ登録処理
app.post('/registration', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  //connectする前にバリデーション入れる　★
  db.connect().then(function() {
    return db.register(username, password);
  }).then(function(result) {
    if (!result) {
      // 画面遷移せず、エラーを出すように変更
      return res.send('NG');
    }
    // 登録成功画面を表示するように変更する
    return res.redirect('success');
    //return res.send('OK');
  }).catch(function(err) {
    // 画面遷移せず、エラーを出すように変更
    return res.send('NG');
  });
});

module.exports.app = app;