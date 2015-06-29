window.addEventListener('load', function(e) {
  var $registration = document.getElementById('registration');
  
  var $errors = document.getElementById('errors');

  $registration.addEventListener('submit', function(e){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var password_confirm = document.getElementById('password_confirm').value;
    var params = {username: username, password: password, password_confirm: password_confirm};

    while($errors.firstChild) {
      $errors.removeChild($errors.firstChild);
    }

    var results = validation(params);
    var passCheckResult = passCheck(params);
    var errorMessages = results.concat(passCheckResult);

    if (errorMessages.length > 0) {
      e.preventDefault();

      var length = errorMessages.length;
      for (var i = 0; i < length; i++) {
        var $strong = document.createElement('strong');
        $strong.textContent = errorMessages[i];  // <strong>username is empty</strong>

        var $li = document.createElement('li'); // <li></li>
        $li.appendChild($strong);

        $errors.appendChild($li);
      }
    }
  });

});