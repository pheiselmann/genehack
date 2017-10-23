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
  console.log("Current state route:" + state.route);
  elements[state.route].show();
  $('.js-fName').focus();
}

function submitAccountInfo(userInfo) {
  console.log(userInfo);
  let settings = {
      url: POST_URL,
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

function reportError(response, status, error) {
  console.log("Response: ", response);
  console.log("Status: ", status);
  console.log("Error: ", error);
  console.log("Response Location:", JSON.stringify(response.responseJSON.location));
  console.log("Response Message:", JSON.stringify(response.responseJSON.message));
};

function watchSubmit() {
  $("form[name='js-create-account-submit-form']").submit(function(event) {
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
  });
}

$("form[name='js-create-account-submit-form-username-missing']").submit(function(event) {
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
  });

$("form[name='js-create-account-submit-form-password-missing']").submit(function(event) {
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
  });

$("form[name='js-create-account-submit-form-password-too-long']").submit(function(event) {
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
    submitAccountInfo(userInfo);  });

$("form[name='js-create-account-submit-form-password-whitespace']").submit(function(event) {
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
  });

$("form[name='js-create-account-submit-form-username-whitespace']").submit(function(event) {
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
  });

$("form[name='js-create-account-submit-form-username-taken']").submit(function(event) {
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
  });

$("form[name='js-create-account-submit-form-snpVariant-incorrect']").submit(function(event) {
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
  });

$("input[type=text]").change(function(){
  $this = $(this);
  localStorage[$this.attr("name")] = $this.val();
  console.log("localStorage: " + JSON.stringify(localStorage));
});

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


$(function(){
  localStorage.clear();
  renderApp(state, PAGE_ELEMENTS);
  watchSubmit();
  // persistForm();
});
