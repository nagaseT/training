window.addEventListener('load', function(e) {
  let $registration = document.getElementById('registration');
  
  let $errors = document.getElementById('errors');

  $registration.addEventListener('submit', function(e){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let password_confirm = document.getElementById('password_confirm').value;
    let params = {username: username, password: password, password_confirm: password_confirm};

    while($errors.firstChild) {
      $errors.removeChild($errors.firstChild);
    }

    let results = validation(params);
    let passCheckResult = passCheck(params);
    let errorMessages = results.concat(passCheckResult);

    if (errorMessages.length > 0) {
      e.preventDefault();

      let length = errorMessages.length;
      for (let i = 0; i < length; i++) {
        let $strong = document.createElement('strong');
        $strong.textContent = errorMessages[i];  // <strong>username is empty</strong>

        let $li = document.createElement('li'); // <li></li>
        $li.appendChild($strong);

        $errors.appendChild($li);
      }
    }
  });

});