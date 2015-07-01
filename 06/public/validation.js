'use strict';

var USERNAME_CHECK = {
  maxStr: 8,
  minStr: 4,
  unallowedCharacters: new RegExp('[^a-z-_]', 'g'),
  noInputErrorMessage: 'usernameを入力して下さい。',
  numberErrorMessage: 'usernameは4文字以上8文字以下です。',
  typeErrorMessage: 'usernameに使用できるのは英小文字と - , _ のみです。'
};
var PASSWORD_CHECK = {
  maxStr: 8,
  minStr: 6,
  unallowedCharacters: new RegExp('[^a-zA-Z-+!@#*&^%~]', 'g'),
  noInputErrorMessage: 'passwordを入力して下さい。',
  numberErrorMessage: 'passwordは6文字以上8文字以下です。',
  typeErrorMessage: 'passwordに使用できるのは英大小字, -, +, !, @ , #, *, &, ^, %, ~ のみです。'
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
    if (usernameMatching) {
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
    if (passwordMatching) {
      messages.push(PASSWORD_CHECK.typeErrorMessage);
    }
  }

  return messages;
}

function isPasswordEqual(params) {
  // confermationが成功したかをチェックする関数名
  var message = [];
  var password = params.password;
  var password_confirm = params.password_confirm;
  if (password !== password_confirm) {
    message.push('入力されたパスワードが異なります。同じパスワードを入力して下さい。');
  }
  return message;
}

if (typeof module === 'object') {
  module.exports.validation = validation;
}
