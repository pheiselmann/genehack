// User homepage routing

// Initial load sets route to home page
let state = {
  route: 'start'
};

// Set route
function setRoute(state, route) {
  state.route = route;
}

// Iterate through amd hide page elements 
// except for element for current route
function renderApp(state, elements) {
  Object.keys(elements).forEach(function(route) {
    elements[route].hide();
  });
  console.log("Current state route:" + state.route);
  elements[state.route].show();
  // Focus cursor in username field
  $('.js-username').focus();
}

// Ajax call to login endpoint either leads
// to success function that stores the Jwt 
// for later use in protected endpoint authetication
// and loads profile page, or leads to error handling function
function submitLogin(username, password) {
  console.log("submitLogin fired")
  // Store username locally
  localStorage.setItem('uname', username);
  let usernamePassword = {"username": username, "password": password};
  console.log("usernamePassword:" + JSON.stringify(usernamePassword));
  let settings = {
      url: '/api/auth/login',
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

// Store Jwt locally for later protected enpoint authentication, and
// make Ajax immediate call to protected endpoint using Jwt that either
// leads to success function directing to profile page, or leads to 
// error reporting function
function storeJWT(data) {
    // Store Jwt locally
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

// Call report error function and set route to/render error page
function handleError(response, status, error) {
  reportError(response, status, error);
  console.log("handleError firing");
  setRoute(state, 'error');
  renderApp(state, PAGE_ELEMENTS);
}

// Report stack error
function reportError(response, status, error) {
  console.log("Response: ", response);
  console.log("Status: ", status);
  console.log("Error: ", error);
};

// Called by ready function upon page load
// Event handler calls Ajax function to log in to account
function watchSubmit() {
  $("form[name='js-login-submit-form']").submit(function(event) {
    event.preventDefault();
    let username = $(this).find('.js-username').val();
    let password = $(this).find('.js-password').val();
    console.log("submitLogin firing with username/password: " + username + "/" + password);
    submitLogin(username, password);
  });
}

// Event handler calls Ajax function to log in to account
// from error page 
$("form[name='js-login-submit-form-error']").submit(function(event) {
    event.preventDefault();
    let username = $(this).find('.js-username').val();
    let password = $(this).find('.js-password').val();
    console.log("submitLogin firing with username/passoword: " + username + "/" + password);
    submitLogin(username, password);
  });

// Makes Ajax call to url with options specified
function retrievePage(url, options) {
	$.ajax(url, options);
}

// State route variables
const PAGE_ELEMENTS = {
  'start': $('.login-page'),
  'error': $('.login-error')
};

// Ready function loads initial page view  and 
// calls initial event handler function
$(function(){
  renderApp(state, PAGE_ELEMENTS);
  watchSubmit();
});

