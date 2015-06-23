var USERNAME_CHECK = {
  maxStr: 8,
  minStr: 2,
  unallowedCharacters: new RegExp("[^a-z-]", "g"),
  numberErrorMessage: 'ERROR : usernameは2文字以上8文字以下です。',
  typeErrorMessage: 'ERROR : usernameに使用できるのは英小文字と - のみです。'
};
var PASSWORD_CHECK = {
  maxStr: 24,
  minStr: 6,
  unallowedCharacters: new RegExp("[^a-zA-Z-\+!@]", "g"),
  numberErrorMessage: 'ERROR : passwordは6文字以上24文字以下です。',
  typeErrorMessage: 'ERROR : passwordに使用できるのは英大小字, -, +, !, @ のみです。'
};

/*
Username と password を受け取り
正しいフォーマット化チェックする。

正しかった場合：　空の配列を返す
正しくなかった場合：　メッセージを入れた配列を返す

使用例：
var errors = validation({Username: 'aaa', password: 'bbb'});
if (errors.length > 0) {
  DOMへの表示処理
}
*/

function validation(params) {
  var messages = [];

  var username = params.username;
  var usernameLength = username.length;
  if (usernameLength < USERNAME_CHECK.minStr || USERNAME_CHECK.maxStr < usernameLength) {
    messages.push(USERNAME_CHECK.numberErrorMessage);
  }
  var usernameMatching = username.match(USERNAME_CHECK.unallowedCharacters);
  if (usernameMatching){
    messages.push(USERNAME_CHECK.typeErrorMessage);
  }

  var password = params.password;
  var passwordLength = password.length;
  if (passwordLength < PASSWORD_CHECK.minStr || PASSWORD_CHECK.maxStr < passwordLength) {
    messages.push(PASSWORD_CHECK.numberErrorMessage);
  }
  var passwordMatching = password.match(PASSWORD_CHECK.unallowedCharacters);
  if (passwordMatching){
    messages.push(PASSWORD_CHECK.typeErrorMessage);
  }

  return messages;
}



