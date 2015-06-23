window.addEventListener('load', function(e) {
  var $login = document.getElementById('login');
  var $errors = document.getElementById('errors');

  $login.addEventListener('submit', function(e){
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
  });

});