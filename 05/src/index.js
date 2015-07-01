var Express = require('express');
var BodyParser = require('body-parser');
var session = require('express-session');
var app = Express();
var helpers = require('express-helpers')(app);

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
app.use(session({
  secret: 'vcp training server'
}));


// routing(req -> res)

// ログイン画面
app.get('/login', function(req, res) {
  res.status(200).render('login', {errorMessages: null});
});

// ユーザ登録画面
app.get('/registration', function(req, res) {
  res.status(200).render('registration', {errorMessages: null});
});

// 
app.get('/illegal_access', function(req, res) {
  res.status(200).render('illegal_access', {errorMessages: ['ログインして下さい。']});
});

// 成功画面
app.get('/main', function(req, res) {
  if (!req.session) {
    return res.status(302).redirect('/illegal_access');
  }
  if (!req.session.username) {
    return res.status(302).redirect('/illegal_access');
  }
  db.connect().then(function() {
    return db.getAllUser();
  }).then(function(resultArr) {
    var loginUser = req.session.username;
    res.status(200).render('main', {
      users: resultArr,
      loginUser: loginUser
    });
  });
});

// 登録ユーザ情報表示画面
app.get('/user', function(req, res) {
  if (!req.session) {
    return res.status(302).redirect('/illegal_access');
  }
  if (!req.session.username) {
    return res.status(302).redirect('/illegal_access');
  }
  var username = req.query.username;
  var loginUser = req.session.username;
  res.status(200).render('user', {
    loginUser: loginUser,
    username: username
  });
});

// ログイン処理
app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var params = {username: username, password: password};
  var valErrorMessage = validation(params);
  if (valErrorMessage.length > 0){
    return res.status(400).render('login', { errorMessages: valErrorMessage });
  }
  db.connect().then(function() {
    return db.login(username, password);
  }).then(function(result) {
    if (!result) {
      return res.status(400).render('login', { errorMessages: ['passwordが違います。'] });
    }
    req.session.username = username;
    return res.redirect('/main');
  }).catch(function(err) {
    return res.status(500).render('login', { errorMessages: ['ログイン失敗です'] });
  });
});

// ログアウト処理
app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    return res.status(200).render('logout');
  });
});

// ユーザ登録処理
app.post('/registration', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var params = {username: username, password: password};
  var valErrorMessage = validation(params);
  if (valErrorMessage.length > 0){
    return res.status(400).render('registration', { errorMessages: valErrorMessage });
  }
  db.connect().then(function() {
    return db.register(username, password);
  }).then(function() {
    req.session.username = username;
    return res.status(200).redirect('main');
  }).catch(function(err) {  // save()に失敗した場合と、すでに登録済みのusernameを登録しようとした場合がある
    //return res.status(400).render('registration', { errors: [err] });
    return res.status(400).render('registration', { errorMessages: ['登録失敗です'] });
  });
});

module.exports.app = app;