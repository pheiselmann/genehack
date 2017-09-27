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
}

// function submitAccountInfo(e) { 
    function submitAccountInfo(userInfo) {
  // e.preventDefault();
  // let fName = $('input[name=js-fName]').val();
  // let lName = $('input[name=js-lName]').val();
  // let uname = $('input[name=js-uname]').val();
  // let pword = $('input[name=js-pword]').val();
  // let snpV = $('input[name=js-snpV]').val();
  // console.log("submitAccountInfo firing with username: " + uname);
  // let userInfo = 
  //   {"firstName": fName,
  //   "lastName": lName, 
  //   "username": uname, 
  //   "password": pword,
  //   "snpVariant": snpV
  //   };
  console.log(userInfo);
  let settings = {
      url: POST_URL,
      dataType: 'json',
      data: JSON.stringify(userInfo),
      contentType: "application/json",
      type: 'POST',
      // headers: { "cache-control": "no-cache" },
      // cache: false,
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
    // let resLocation = JSON.stringify(response.responseJSON.location);
    // console.log(JSON.stringify(response.responseJSON.location));
    // console.log(JSON.stringify(response.responseJSON.message));
    // console.log(resLocation);
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

//Eventually will replace duplicate code in submit functions with this
// function submitAccountInfoToAjaxFn(event) {
//     let fName = $(this).find('.js-fName').val();
//     let lName = $(this).find('.js-lName').val();
//     let uname = $(this).find('.js-uname').val();
//     let pword = $(this).find('.js-pword').val();
//     let snpV = $(this).find('.js-snpV').val();
//     console.log("submitAccountInfo firing with username: " + uname);
//     let userInfo = 
//       {"firstName": fName,
//       "lastName": lName, 
//       "username": uname, 
//       "password": pword,
//       "snpVariant": snpV
//       };
//     //console.log("Create account submit form firing with " + $('input[name=js-uname]').val())
//     submitAccountInfo(userInfo);
// }

function watchSubmit() {
  $("form[name='js-create-account-submit-form']").submit(function(event) {
    event.preventDefault();
    // submitAccountInfoToAjaxFn(event);
    let fName = $(this).find('.js-fName').val();
    let lName = $(this).find('.js-lName').val();
    let uname = $(this).find('.js-uname').val();
    let pword = $(this).find('.js-pword').val();
    let snpV = $(this).find('.js-snpV').val();
    console.log("submitAccountInfo firing with username: " + uname);
    let userInfo = 
      {"firstName": fName,
      "lastName": lName, 
      "username": uname, 
      "password": pword,
      "snpVariant": snpV
      };
    //console.log("Create account submit form firing with " + $('input[name=js-uname]').val())
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
    console.log("submitAccountInfo firing with username: " + uname);
    let userInfo = 
      {"firstName": fName,
      "lastName": lName, 
      "username": uname, 
      "password": pword,
      "snpVariant": snpV
      };
    //console.log("Create account submit form firing with " + $('input[name=js-uname]').val())
    submitAccountInfo(userInfo);
  });

$("form[name='js-create-account-submit-form-password-missing']").submit(function(event) {
    event.preventDefault();
    let fName = $(this).find('.js-fName').val();
    let lName = $(this).find('.js-lName').val();
    let uname = $(this).find('.js-uname').val();
    let pword = $(this).find('.js-pword').val();
    let snpV = $(this).find('.js-snpV').val();
    console.log("submitAccountInfo firing with username: " + uname);
    let userInfo = 
      {"firstName": fName,
      "lastName": lName, 
      "username": uname, 
      "password": pword,
      "snpVariant": snpV
      };
    //console.log("Create account submit form firing with " + $('input[name=js-uname]').val())
    submitAccountInfo(userInfo);
  });

$("form[name='js-create-account-submit-form-password-whitespace']").submit(function(event) {
    event.preventDefault();
    let fName = $(this).find('.js-fName').val();
    let lName = $(this).find('.js-lName').val();
    let uname = $(this).find('.js-uname').val();
    let pword = $(this).find('.js-pword').val();
    let snpV = $(this).find('.js-snpV').val();
    console.log("submitAccountInfo firing with username: " + uname);
    let userInfo = 
      {"firstName": fName,
      "lastName": lName, 
      "username": uname, 
      "password": pword,
      "snpVariant": snpV
      };
    //console.log("Create account submit form firing with " + $('input[name=js-uname]').val())
    submitAccountInfo(userInfo);
  });

$("form[name='js-create-account-submit-form-username-whitespace']").submit(function(event) {
    event.preventDefault();
    let fName = $(this).find('.js-fName').val();
    let lName = $(this).find('.js-lName').val();
    let uname = $(this).find('.js-uname').val();
    let pword = $(this).find('.js-pword').val();
    let snpV = $(this).find('.js-snpV').val();
    console.log("submitAccountInfo firing with username: " + uname);
    let userInfo = 
      {"firstName": fName,
      "lastName": lName, 
      "username": uname, 
      "password": pword,
      "snpVariant": snpV
      };
    //console.log("Create account submit form firing with " + $('input[name=js-uname]').val())
    submitAccountInfo(userInfo);
  });

$("form[name='js-create-account-submit-form-username-taken']").submit(function(event) {
    event.preventDefault();
    let fName = $(this).find('.js-fName').val();
    let lName = $(this).find('.js-lName').val();
    let uname = $(this).find('.js-uname').val();
    let pword = $(this).find('.js-pword').val();
    let snpV = $(this).find('.js-snpV').val();
    console.log("submitAccountInfo firing with username: " + uname);
    let userInfo = 
      {"firstName": fName,
      "lastName": lName, 
      "username": uname, 
      "password": pword,
      "snpVariant": snpV
      };
    //console.log("Create account submit form firing with " + $('input[name=js-uname]').val())
    submitAccountInfo(userInfo);
  });

$("form[name='js-create-account-submit-form-snpVariant-incorrect']").submit(function(event) {
    event.preventDefault();
    let fName = $(this).find('.js-fName').val();
    let lName = $(this).find('.js-lName').val();
    let uname = $(this).find('.js-uname').val();
    let pword = $(this).find('.js-pword').val();
    let snpV = $(this).find('.js-snpV').val();
    console.log("submitAccountInfo firing with username: " + uname);
    let userInfo = 
      {"firstName": fName,
      "lastName": lName, 
      "username": uname, 
      "password": pword,
      "snpVariant": snpV
      };
    //console.log("Create account submit form firing with " + $('input[name=js-uname]').val())
    submitAccountInfo(userInfo);
  });


const PAGE_ELEMENTS = {
  'create-account': $('.create-account'),
  'username-taken': $('.create-account-username-taken'),
  'username-whitespace': $('.create-account-username-whitespace'),
  'password-whitespace': $('.create-account-password-whitespace'),
  // 'pword-length': $('.create-account-pword-length'),
  'password-missing': $('.create-account-pword-missing'),
  'username-missing': $('.create-account-username-missing'),
  'snpVariant-incorrect': $('.create-account-snpVariant-incorrect')
  // 'pword-username-missing': $('.create-account-pword-username-missing')
};


$(function(){
  renderApp(state, PAGE_ELEMENTS);
  watchSubmit();
});
