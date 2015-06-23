var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var login = require('./model/users');

// setting
app.set('views', './views');
app.set('view engine', 'ejs');

//middle ware
app.use('/public', express.static('public'));
app.use('/login_form', express.static('login_form'));

// application/x-www-form-urlencoded (username=soneda&items=10)
app.use(bodyParser.urlencoded({extended: true}));
// application/json
// multipart/form-data (file upload)

// routing(req->res)

// GET http://localhost:3000/hello -> world
app.get('/hello', function(req, res) {
  res.send('world');
});

// GET http://localhost:3000/search?q=node -> node
app.get('/search', function(req, res) {
  console.log(req.query);
  res.send(req.query.q);
});

// GET /users/soneda -> soneda
app.get('/users/:id', function(req, res) {
  res.send(req.params.id);
});

// GET /submit
app.get('/submit', function(req, res) {
  res.send(req.query.username);
});

// POST /submit
app.post('/submit', function(req, res) {
  res.send(req.body);
});

/*
  console.log(req.body);
  console.log(req.params);
  console.log(req.path);
  console.log(req.query);
*/

// GET /ejs
app.get('/ejs', function(req, res) {
  //var id = req.query.id;
  //res.render('index', { id: id });
  res.redirect('hello');
});


var users = {
  soneda: 'adenos'
}

app.get('/test', function(req, res) {
  if (req.query.username in users) {
    if (req.query.password === users[req.query.username]) {
      return res.send('OK');
    }
  }
  return res.send('NG');
});

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  login.login(username, password, function(err, results){
    if (err) {
      return res.send('NG');
    }
    // fail safe (安全側に倒す)
    if (!results) {
      return res.send('NG');
    }
    return res.send('OK');
  });
});


module.exports.app = app;

