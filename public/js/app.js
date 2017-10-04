const serverBase = '/';
const PROFILE_URL = serverBase + 'account';
const LOGIN_URL = serverBase + 'api/auth/login';
const POST_URL = serverBase + 'api/users';

let state = {
  route: 'start'
};

function setRoute(state, route) {
  state.route = route;
}

function renderApp(state, elements) {
  Object.keys(elements).forEach(function(route) {
    elements[route].hide();
  });
  console.log("Current state route:" + state.route);
  elements[state.route].show();
  $('.js-username').focus();
}

function submitLogin(username, password) {
  console.log("submitLogin fired")
  localStorage.setItem('uname', username);
  let usernamePassword = {"username": username, "password": password};
  console.log("usernamePassword:" + JSON.stringify(usernamePassword));
  let settings = {
      url: LOGIN_URL,
      dataType: 'json',
      data: JSON.stringify(usernamePassword),
      contentType: "application/json",
      type: 'POST',
      success: function(data) {
        if (data) {
          storeJWT(data)
        }
      },
      error: handleError
  };
  $.ajax(settings);
}

function storeJWT(data) {
    localStorage.setItem('token', data.authToken);
    console.log('JWT in local storage: ' + localStorage.getItem('token'));
    retrievePage('/api/protected',
        {
          dataType: 'json',
          contentType: "application/json",
          beforeSend: function (request)
          {
             request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
          },
          type: 'GET',
          success: window.location.href="/profile",
          error: reportError
        }
      );
}

function handleError(response, status, error) {
  reportError(response, status, error);
  console.log("handleError firing");
  setRoute(state, 'error');
  renderApp(state, PAGE_ELEMENTS);
}

function reportError(response, status, error) {
  console.log("Response: ", response);
  console.log("Status: ", status);
  console.log("Error: ", error);
};

function watchSubmit() {
  $("form[name='js-login-submit-form']").submit(function(event) {
    event.preventDefault();
    let username = $(this).find('.js-username').val();
    let password = $(this).find('.js-password').val();
    console.log("submitLogin firing with username/password: " + username + "/" + password);
    submitLogin(username, password);
  });
}

$("form[name='js-login-submit-form-error']").submit(function(event) {
    event.preventDefault();
    let username = $(this).find('.js-username').val();
    let password = $(this).find('.js-password').val();
    console.log("submitLogin firing with username/passoword: " + username + "/" + password);
    submitLogin(username, password);
  });

function retrievePage(url, options) {
	$.ajax(url, options);
}

function displayPage(data) {
	$('body').html(
    '<p>' + 'Result: ' + data.data + '</p>' +
    '<p>' + 'Name: ' + data.name + '</p>' +
    '<p>' + 'username: ' + data.username + '</p>' +
    '<p>' + 'snpVariant: ' + data.snpVariant + '</p>'
  );
}

const PAGE_ELEMENTS = {
  'start': $('.login-page'),
  'error': $('.login-error')
};

$(function(){
  renderApp(state, PAGE_ELEMENTS);
  watchSubmit();
});

