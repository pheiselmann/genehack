const serverBase = '/';
const POST_URL = serverBase + 'api/users';

let state = {
    route: 'create-account'
}

function setRoute(state, route) {
  state.route = route;
}

function renderApp(state, elements) {
  Object.keys(elements).forEach(function(route) {
    elements[route].hide();
  });
  elements[state.route].show();
}

function submitAccountInfo(e) { 
  e.preventDefault();
  let fName = $('input[name=js-fName]').val();
  let lName = $('input[name=js-lName]').val();
  let uname = $('input[name=js-uname]').val();
  let pword = $('input[name=js-pword]').val();
  let snpV = $('input[name=js-snpV]').val();
  let userInfo = 
    {"firstName": fName,
    "lastName": lName, 
    "username": uname, 
    "password": pword,
    "snpVariant": snpV
    };
  console.log(userInfo);
  let settings = {
      url: POST_URL,
      dataType: 'json',
      data: JSON.stringify(userInfo),
      contentType: "application/json",
      type: 'POST',
      // success: retrievePage(serverBase),
      // success: returnToStartPage(state, 'start'),
      success: function(data) {
        if (data) {
        window.location.href="/login"
        }
      },
      error: handleError
  };
  $.ajax(settings);
}

function handleError(response, status, error) {
    reportError(response, status, error);
    console.log("handleError firing");
    let resLocation = JSON.stringify(response.responseJSON.location);
    console.log(JSON.stringify(response.responseJSON.location));
    console.log(JSON.stringify(response.responseJSON.message));
    console.log(resLocation);
    if (JSON.stringify(response.responseJSON.location) === "username" || 
        JSON.stringify(response.responseJSON.message) === "Must be at least 1 characters long")
    {
        console.log("Missing username criteria met.");
        setRoute(state, 'username-missing');
        renderApp(state, PAGE_ELEMENTS);
    }
}

function reportError(response, status, error) {
  console.log("Response: ", response);
  console.log("Status: ", status);
  console.log("Error: ", error);
  console.log("Response Location:", JSON.stringify(response.responseJSON.location));
  console.log("Response Message:", JSON.stringify(response.responseJSON.message));
};


var PAGE_ELEMENTS = {
  'create-account': $('.create-account'),
  'username-taken': $('.create-account-username-taken'),
  'username-whitespace': $('.create-account-username-whitespace'),
  'password-whitesapce': $('.create-account-password-whitespace'),
  // 'pword-length': $('.create-account-pword-length'),
  'pword-missing': $('.create-account-pword-missing'),
  'username-missing': $('.create-account-username-missing'),
  'snpVariant-incorrect': $('.create-account-snpVariant-incorrect')
  // 'pword-username-missing': $('.create-account-pword-username-missing')
};