var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//var cookieParser = require('cookie-parser');
var session = require('express-session');

//var login = require('./model/users');

// setting
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//middle ware
app.use('/public', express.static('public'));
app.use('/login_form', express.static('login_form'));
//app.use(cookieParser());
app.use(session({ 
  secret: 'vcp training server'
}));

// application/x-www-form-urlencoded (username=soneda&items=10)
app.use(bodyParser.urlencoded({extended: true}));
// application/json
// multipart/form-data (file upload)

// routing(req->res)


// GET http://localhost:3000/hello -> world
app.get('/1', function(req, res) {
  var name = req.query.name;
  req.session.name = name;
  res.send(name + '<a href="/2">2</a>');
});

app.get('/2', function(req, res) {
  var name = req.session.name;
  res.send(name + '<a href="/3">3</a>');
});

app.get('/3', function(req, res) {
  var name = req.session.name;
  req.session.destroy(function() {
    res.send(name);
  });
});

module.exports.app = app;

