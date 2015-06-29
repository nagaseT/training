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

function passCheck(params) {
  var message = [];
  var password_1 = params.password;
  var password_2 = params.password_2;
  if (password_1 !== password_2) {
    message.push('ERROR : 入力されたパスワードが異なります。同じパスワードを入力して下さい。');
  }
  return message;
}


if (typeof module === 'object') {
  module.exports.validation = validation;
}
