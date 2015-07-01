window.addEventListener('load', function(e) {
  let $login = document.getElementById('login');
  
  let $errors = document.getElementById('errors');

  $login.addEventListener('submit', function(e){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let params = {username: username, password: password};

    while($errors.firstChild) {
      $errors.removeChild($errors.firstChild);
    }

    let results = validation(params);

    if (results.length > 0) {
      e.preventDefault();

      let length = results.length;
      for (let i = 0; i < length; i++) {
        let $strong = document.createElement('strong');
        $strong.textContent = results[i];  // <strong>username is empty</strong>

        let $li = document.createElement('li'); // <li></li>
        $li.appendChild($strong);

        $errors.appendChild($li);
      }
    }
  });

});