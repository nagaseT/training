let Express = require('express');
let BodyParser = require('body-parser');
let session = require('express-session');
let app = Express();
let helpers = require('express-helpers')(app);

let Config = require('./../config');

let DataBase = require('./model/db'); // db.jsのコンストラクタ(DB())が入る
//import DataBase from './model/db';
let db = new DataBase(Config.config.mysql);

let validation = require('./../public/validation').validation;

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
app.get('/login', (req, res) => res.render('login', {errorMessages: null}));

// ユーザ登録画面
app.get('/registration', (req, res) => res.render('registration', {errorMessages: null}));

// 
app.get('/illegal_access', (req, res) => res.render('illegal_access', {errorMessages: ['ログインして下さい。']}));

// 成功画面
app.get('/main', (req, res) => {
  if (!req.session) {
    return res.status(302).redirect('/illegal_access');
  }
  if (!req.session.username) {
    return res.status(302).redirect('/illegal_access');
  }
  db.connect()
    .then(() => db.getAllUser())
    .then((users) => {
      let loginUser = req.session.username;
      res.render('main', { users, loginUser });
  });
});

// 登録ユーザ情報表示画面
app.get('/user', (req, res) => {
  if (!req.session) {
    return res.status(302).redirect('/illegal_access');
  }
  if (!req.session.username) {
    return res.status(302).redirect('/illegal_access');
  }
  let username = req.query.username;
  let loginUser = req.session.username;
  res.render('user', { loginUser, username });
});

// ログイン処理
app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let params = { username, password };
  let errorMessages = validation(params);
  if (errorMessages.length > 0){
    return res.status(400).render('login', { errorMessages });
  }
  db.connect()
    .then(() => db.login(username, password))
    .then((result) => {
      if (!result) {
        return res.status(400).render('login', { errorMessages: ['passwordが違います。'] });
      }
      req.session.username = username;
      return res.redirect('/main');
    }).catch((err) => {
      return res.status(500).render('login', { errorMessages: ['ログイン失敗です'] });
    });
});

// ログアウト処理
app.get('/logout', (req, res) => req.session.destroy(() => res.render('logout')));

// ユーザ登録処理
app.post('/registration', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let params = {username, password};
  let errorMessages = validation(params);
  if (errorMessages.length > 0){
    return res.status(400).render('registration', { errorMessages });
  }
  db.connect()
    .then(() => db.register(username, password))
    .then(() => {
      req.session.username = username;
      return res.redirect('main');
    }).catch((err) => {  // save()に失敗した場合と、すでに登録済みのusernameを登録しようとした場合がある
      if (!err.errors) {
        return res.status(500).render('registration', { errorMessages: ['登録に失敗しました。'] });
      }
      let usernameExistFlg = false;
      err.errors.forEach((error) => {
        if (error.message === 'username must be unique') {
          usernameExistFlg = true;
        }
      });
      if (usernameExistFlg) {
        return res.status(400).render('registration', { errorMessages: [`${username} はすでに登録されています。`] });
      }
      return res.status(500).render('registration', { errorMessages: ['登録に失敗しました。'] });
    });
});

module.exports.app = app;