// Signup
var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
var btn = document.querySelector('.js-signup-submit');
var eml = document.querySelector('.js-signup-email');

function isValidEmail(email) {
  return EMAIL_REGEXP.test(email);
}

eml.addEventListener('keydown', function() {
  if (isValidEmail(eml.value.trim())) {
    btn.removeAttribute('disabled');
    return;
  }

  btn.setAttribute('disabled', 'true');
});

btn.addEventListener('click', function() {
  var email = eml.value.trim();

  if (!isValidEmail(email)) {
    return;
  }

  mixpanel.track('Sign ups', {
    'Email': email,
    'Has clicked tabs': hasClickedTabs
  });

  var request = new XMLHttpRequest();
  var params  = 'email=' + email; 

  request.open('POST', '//utils.yepjet.com/add-email', true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.onload = function() {
    if(request.status == 201)
      window.location = '/survey?email=' + email;
    else
      document.querySelector('.js-signup-error').style.display = 'block';
  };

  request.send(params);
});
