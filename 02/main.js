window.addEventListener('load', function(e) {
  var $login = document.getElementById('login');

/*
  var $user_error = document.getElementById('user_input_error');
  $user_error.addEventListener('click', function(e){
    var $parent = $user_error.parentNode;
    $parent.removeChild($user_error);
  });

  var $password_error = document.getElementById('password_input_error');
  $password_error.addEventListener('click', function(e){
    var $parent = $password_error.parentNode;
    $parent.removeChild($password_error);
  });
*/
/*
  var $errors = document.getElementById('errors');
  $errors.addEventListener('click', function(e){
    console.log(e.target);
    errors.removeChild(e.target);
  });
*/
  /*
  var $li = document.querySelectorAll('#errors li');
  console.log($li);
  */

  $login.addEventListener('submit', function(e){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log(username, password);

    var params = {username: username, password: password};
    console.log(params);
    var results = validation(params);
    console.log(results);

    if (results.length !== 0) {
      e.preventDefault();
      var $errors = document.getElementById('errors');

    while($errors.firstChild) {
      $errors.removeChild($errors.firstChild);
    }

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