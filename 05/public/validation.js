var USERNAME_CHECK = {
  maxStr: 8,
  minStr: 4,
  unallowedCharacters: new RegExp('[^a-z-_]', 'g'),
  noInputErrorMessage: 'ERROR : usernameを入力して下さい。',
  numberErrorMessage: 'ERROR : usernameは4文字以上8文字以下です。',
  typeErrorMessage: 'ERROR : usernameに使用できるのは英小文字と - , _ のみです。'
};
var PASSWORD_CHECK = {
  maxStr: 8,
  minStr: 6,
  unallowedCharacters: new RegExp('[^a-zA-Z-\+!@#\*&\^%~]', 'g'),
  noInputErrorMessage: 'ERROR : passwordを入力して下さい。',
  numberErrorMessage: 'ERROR : passwordは6文字以上8文字以下です。',
  typeErrorMessage: 'ERROR : passwordに使用できるのは英大小字, -, +, !, @ , #, *, &, ^, %, ~ のみです。'
};

function validation(params) {
  var messages = [];

  var username = params.username;
  var usernameLength = username.length;
  if (usernameLength === 0) {
    messages.push(USERNAME_CHECK.noInputErrorMessage);
  } else {
    if (usernameLength < USERNAME_CHECK.minStr || USERNAME_CHECK.maxStr < usernameLength) {
      messages.push(USERNAME_CHECK.numberErrorMessage);
    }
    var usernameMatching = username.match(USERNAME_CHECK.unallowedCharacters);
    if (usernameMatching){
      messages.push(USERNAME_CHECK.typeErrorMessage);
    }
  }

  var password = params.password;
  var passwordLength = password.length;
  if (passwordLength === 0) {
    messages.push(PASSWORD_CHECK.noInputErrorMessage);
  } else {
    if (passwordLength < PASSWORD_CHECK.minStr || PASSWORD_CHECK.maxStr < passwordLength) {
      messages.push(PASSWORD_CHECK.numberErrorMessage);
    }
    var passwordMatching = password.match(PASSWORD_CHECK.unallowedCharacters);
    if (passwordMatching){
      messages.push(PASSWORD_CHECK.typeErrorMessage);
    }
  }

  return messages;
}


var onSubmit = function(e){
  var $errors = document.getElementById('errors');
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var params = {username: username, password: password};

  while($errors.firstChild) {
    $errors.removeChild($errors.firstChild);
  }

  var results = validation(params);

  if (results.length > 0) {
    e.preventDefault();

    var length = results.length;
    for (var i = 0; i < length; i++) {
      var $strong = document.createElement('strong');
      $strong.textContent = results[i];  // <strong>username is empty</strong>

      var $li = document.createElement('li'); // <li></li>
      $li.appendChild($strong);

      $errors.appendChild($li);
    }
  }
}

/*
if (typeof module === 'object') {
  module.exports.validation = validation;
}
*/