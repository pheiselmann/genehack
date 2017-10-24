//Create account page routing

//Initial load sets route to create acount page
let state = {
    route: 'create-account'
}

//Set route
function setRoute(state, route) {
  state.route = route;
}

//Iterate through amd hide page elements 
//except for element for current route
function renderApp(state, elements) {
  Object.keys(elements).forEach(function(route) {
    elements[route].hide();
  });
  console.log("Current state route:" + state.route);
  elements[state.route].show();
  //Focus cursor on first name field
  $('.js-fName').focus();
}

//Ajax call to users endpoint where account profile
//is created from input fields - either leads to success
//function which clears any items in local storage from 
//previous users and directs to login page, or leads to
//error handling function
function submitAccountInfo(userInfo) {
  console.log(userInfo);
  let settings = {
      url: '/api/users',
      dataType: 'json',
      data: JSON.stringify(userInfo),
      contentType: "application/json",
      type: 'POST',
      success: function(data) {
        if (data) {
          localStorage.clear();
          window.location.href="/login"
        }
      },
      error: handleError
  };
  $.ajax(settings);
}

//Call function that reports stack error and set route/render 
//appropriate error page according to error response location 
//and message 
function handleError(response, status, error) {
    reportError(response, status, error);
    console.log("handleError firing");
    if (JSON.stringify(response.responseJSON.location) === "\"username\"" && 
        JSON.stringify(response.responseJSON.message) === "\"Must be at least 1 characters long\"")
    {
    
        console.log("Missing username criteria met.");
        setRoute(state, 'username-missing');
        renderApp(state, PAGE_ELEMENTS);
    } else if
        (JSON.stringify(response.responseJSON.location) === "\"password\"" && 
        JSON.stringify(response.responseJSON.message) === "\"Must be at least 10 characters long\"")
    {
        console.log("Missing password criteria met.");
        setRoute(state, 'password-missing');
        renderApp(state, PAGE_ELEMENTS);
    } else if
        (JSON.stringify(response.responseJSON.location) === "\"password\"" && 
        JSON.stringify(response.responseJSON.message) === "\"Must be at most 72 characters long\"")
    {
        console.log("Overly long password criteria met.");
        setRoute(state, 'password-too-long');
        renderApp(state, PAGE_ELEMENTS);
    } else if
        (JSON.stringify(response.responseJSON.location) === "\"username\"" && 
        JSON.stringify(response.responseJSON.message) === "\"Username already taken\"")
    {
        console.log("Duplicate username criteria met.");
        setRoute(state, 'username-taken');
        renderApp(state, PAGE_ELEMENTS);
    } else if
        (JSON.stringify(response.responseJSON.location) === "\"username\"" && 
        JSON.stringify(response.responseJSON.message) === "\"Cannot start or end with whitespace\"")
    {
        console.log("Username whitespace criteria met.");
        setRoute(state, 'username-whitespace');
        renderApp(state, PAGE_ELEMENTS);
    } else if
        (JSON.stringify(response.responseJSON.location) === "\"password\"" && 
        JSON.stringify(response.responseJSON.message) === "\"Cannot start or end with whitespace\"")
    {
        console.log("Password whitespace criteria met.");
        setRoute(state, 'password-whitespace');
        renderApp(state, PAGE_ELEMENTS);
    } else if
        (JSON.stringify(response.responseJSON.message) === "\"Incorrect snpVariant\"")
    {
        console.log("Incorrect snp criteria met.");
        setRoute(state, 'snpVariant-incorrect');
        renderApp(state, PAGE_ELEMENTS);
    }
}

//Report stack error
function reportError(response, status, error) {
  console.log("Response: ", response);
  console.log("Status: ", status);
  console.log("Error: ", error);
  console.log("Response Location:", JSON.stringify(response.responseJSON.location));
  console.log("Response Message:", JSON.stringify(response.responseJSON.message));
};

//Event handler function creates user info variables and
//sends userInfo object to Ajax function that calls account
//creation endpoint; also persists data in form fields
function handleAccountInfo(event) {
  event.preventDefault();
  let fName = $(this).find('.js-fName').val();
  let lName = $(this).find('.js-lName').val();
  let uname = $(this).find('.js-uname').val();
  let pword = $(this).find('.js-pword').val();
  let snpV = $(this).find('.js-snpV').val();
  let userInfo = 
    {"firstName": fName,
    "lastName": lName, 
    "username": uname, 
    "password": pword,
    "snpVariant": snpV
    };
  persistForm();
  submitAccountInfo(userInfo);
}

//Called by ready function upon page load
//JQuery function calls event handler for initial account info
//submission
function watchSubmit() {
  $("form[name='js-create-account-submit-form']").submit(handleAccountInfo) 
}

//JQuery function calls event handler for account info
//submission from username missing error page
$("form[name='js-create-account-submit-form-username-missing']").submit(handleAccountInfo)

//JQuery function calls event handler for account info
//submission from password missing error page
$("form[name='js-create-account-submit-form-password-missing']").submit(handleAccountInfo)

//JQuery function calls event handler for account info
//submission from password too long error page
$("form[name='js-create-account-submit-form-password-too-long']").submit(handleAccountInfo)

//JQuery function calls event handler for account info
//submission from password whitespaces error page
$("form[name='js-create-account-submit-form-password-whitespace']").submit(handleAccountInfo)

//JQuery function calls event handler for account info
//submission from username whitespaces error page
$("form[name='js-create-account-submit-form-username-whitespace']").submit(handleAccountInfo)

//JQuery function calls event handler for account info
//submission from username taken error page
$("form[name='js-create-account-submit-form-username-taken']").submit(handleAccountInfo)

//JQuery function calls event handler for account info
//submission from unuseable variant error page
$("form[name='js-create-account-submit-form-snpVariant-incorrect']").submit(handleAccountInfo)

//Stores each text-type input field variable locally
$("input[type=text]").change(function(){
  $this = $(this);
  localStorage[$this.attr("name")] = $this.val();
  console.log("localStorage: " + JSON.stringify(localStorage));
});

//If text-type input filed variable is stored locally,
//populates field in each load of create account form
function persistForm() {
  if (localStorage) {
    if (localStorage.fName) {
      $('.js-fName').val(localStorage.fName);
    }
    if (localStorage.lName) {
      $('.js-lName').val(localStorage.lName);
    }
    if (localStorage.uname) {
      $('.js-uname').val(localStorage.uname);
    }
    if (localStorage.snpV) {
      $('.js-snpV').val(localStorage.snpV);
    }
  }
}

//State route variables
const PAGE_ELEMENTS = {
  'create-account': $('.create-account'),
  'username-taken': $('.create-account-username-taken'),
  'username-whitespace': $('.create-account-username-whitespace'),
  'password-whitespace': $('.create-account-password-whitespace'),
  'password-missing': $('.create-account-pword-missing'),
  'password-too-long': $('.create-account-pword-too-long'),
  'username-missing': $('.create-account-username-missing'),
  'snpVariant-incorrect': $('.create-account-snpVariant-incorrect')
};

//Ready function fires upon page load, clears any locally stored 
//items from previous session, loads initial page view, and 
//calls initial event handler function
$(function(){
  localStorage.clear();
  renderApp(state, PAGE_ELEMENTS);
  watchSubmit();
});
