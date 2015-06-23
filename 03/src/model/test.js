var users = require('./users');

users.login('soneda', 'aaaaaa', function(err, result){
  console.log(err, result);
});
