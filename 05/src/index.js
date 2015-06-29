var Express = require('express');
var BodyParser = require('body-parser');
var session = require('express-session');
var app = Express();

var Config = require('./../config');

var DataBase = require('./model/db'); // db.jsのコンストラクタ(DB())が入る
var db = new DataBase(Config.config.mysql);

//var validation = require('./../public/validation').validation;
var validation = require('./../public/validationS').validation;

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
app.get('/login_form', function(req, res) {
  res.status(200).render('login_form', {errors: []});
});

// ユーザ登録画面
app.get('/registration_form', function(req, res) {
  res.status(200).render('registration_form', {errors: []});
});

// 成功画面
app.get('/main', function(req, res) {
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

// ログイン処理
app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var params = {username: username, password: password};
  var valErrorMessage = validation(params);
  if (valErrorMessage.length > 0){
    return res.status(400).render('login_form', { errors: valErrorMessage });
  }
  db.connect().then(function() {
    return db.login(username, password);
  }).then(function(result) {
    if (!result) {
      return res.status(400).render('login_form', { errors: result });
    }
    // ここでセッションに追加する　★
    req.session.username = username;
    return res.status(200).redirect('/main');
  }).catch(function(err) {
    return res.status(500).render('login_form', { errors: [err] });
  });
});

// ユーザ登録処理
app.post('/registration', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var params = {username: username, password: password};
  var valErrorMessage = validation(params);
  if (valErrorMessage.length > 0){
    return res.status(400).render('registration_form', { errors: valErrorMessage });
  }
  db.connect().then(function() {
    return db.register(username, password);
  }).then(function() {
    req.session.username = username;
    return res.status(200).redirect('main');
  }).catch(function(err) {  // save()に失敗した場合と、すでに登録済みのusernameを登録しようとした場合がある
    //return res.status(400).render('registration_form', { errors: [err] });
    return res.status(400).render('registration_form', { errors: ['登録失敗だす'] });
  });
});

module.exports.app = app;