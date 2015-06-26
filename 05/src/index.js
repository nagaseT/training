var Express = require('express');
var BodyParser = require('body-parser');
var app = Express();

var Config = require('./../config');

var DataBase = require('./model/db'); // db.jsのコンストラクタ(DB())が入る
var db = new DataBase(Config.config.mysql);

var validation = require('./../public/validation').validation;

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
  res.render('login_form', {message: null});
});

// ユーザ登録画面
app.get('/registration_form', function(req, res) {
  res.render('registration_form', {message: null});
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

  var params = {username: username, password: password};
  var valErrorMessage = validation(params);
  if (valErrorMessage.length > 0){
    return res.redirect('/login_form');
  } else {
    db.connect().then(function() {
      return db.login(username, password);
    }).then(function(result) {
      if (!result) {
        return res.render('login_form', { message: 'ログインに失敗しました。' });
      }
      // ログイン成功画面を表示するように変更する
      return res.redirect('/success');
      //return res.send('OK');
    }).catch(function(err) {
      // 画面遷移せず、エラーを出すように変更
      return res.render('login_form', { message: 'ログインに失敗しました。' });
    });
  }
});

// ユーザ登録処理
app.post('/registration', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var params = {username: username, password: password};
  var valErrorMessage = validation(params);
  if (valErrorMessage.length > 0){
    return res.redirect('/registration_form');
  } else {
    db.connect().then(function() {
      return db.register(username, password);
    }).then(function(result) {
      if (!result) {
        return res.render('registration_form', { message: username + 'はすでに使われています。' });
      }
      return res.redirect('success');
    }).catch(function(err) {
      return res.render('registration_form', { message: 'アカウントの登録に失敗しました。' });
    });
  }
});

module.exports.app = app;