const serverBase = '/';
const PROFILE_URL = serverBase + 'account';
const LOGIN_URL = serverBase + 'api/auth/login';
const POST_URL = serverBase + 'api/users';

/* Including state router from movie project */
let state = {
  route: 'start'
};

// State modification functions
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

// Render functions
// function renderApp(state, elements) {
//   if (state.route === 'start') {
//       retrievePage(serverBase, 
//       	{
//       		url: serverBase,
//       		dataType: 'json',
//       		contentType: "text/html",
//       		type: 'GET',
//       		success: displayStartPage,
//           error: reportError
//   		  }
//     );
//   } else if (state.route === 'account') {
//     retrievePage(PROFILE_URL,
//         {
//           dataType: 'json',
//           contentType: "text/json",
//           beforeSend: function (request)
//           {
//              request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
//           },
//           type: 'GET',
//           success: displayPage,
//           // success: function(data) {
//           error: reportError
//         }
//       );
//   } else if (state.route === 'login') {
//   	retrievePage(LOGIN_URL,

//     );
//   } else if (state.route === 'logout') {
//     deleteJWT();
//     retrievePage(serverBase);
//   }; 
// }

// function displayStartPage() {
//   window.location.href="/login"; 
// }


function submitLogin(username, password) {
  //e.preventDefault();
  console.log("submitLogin fired")
  //let uname = username;
  //store username
  localStorage.setItem('uname', username);
  //let pword = pasword
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
    //put JWT in local storage
    localStorage.setItem('token', data.authToken);
    console.log('JWT in local storage: ' + localStorage.getItem('token'));
    // redirect to account page:
    // setRoute(state, 'account');
    // renderApp(state, {});
    // window.location.href="/account";
    retrievePage(PROFILE_URL,
        {
          dataType: 'json',
          // contentType: "text/json",
          contentType: "application/json",
          beforeSend: function (request)
          {
             request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
          },
          type: 'GET',
          //PROBLEM HERE!!!!!!
          success: window.location.href="/profile",
          // success: displayPage,
          // success: function(data) {
          // success: function(data) {
          //   if (data) {
              // window.location.href="/account";
              //console.log("success")
              // displayPage
          //   }
          // },
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
  //console.log("Response Location:", JSON.stringify(response.responseJSON.location));
  //console.log("Response Message:", JSON.stringify(response.responseJSON.message));
};

function watchSubmit() {
  $("form[name='js-login-submit-form']").submit(function(event) {
    event.preventDefault();
    // submitAccountInfoToAjaxFn(event);
    let username = $(this).find('.js-username').val();
    let password = $(this).find('.js-password').val();
    console.log("submitLogin firing with username/password: " + username + "/" + password);
    //console.log("Create account submit form firing with " + $('input[name=js-uname]').val())
    submitLogin(username, password);
  });
}

$("form[name='js-login-submit-form-error']").submit(function(event) {
    event.preventDefault();
    let username = $(this).find('.js-username').val();
    let password = $(this).find('.js-password').val();
    console.log("submitLogin firing with username/passoword: " + username + "/" + password);
    //console.log("Create account submit form firing with " + $('input[name=js-uname]').val())
    submitLogin(username, password);
  });

// function submitAccountInfo(e) { 
//   e.preventDefault();
//   let fName = $('input[name=js-fName]').val();
//   let lName = $('input[name=js-lName]').val();
//   let uname = $('input[name=js-uname]').val();
//   let pword = $('input[name=js-pword]').val();
//   let snpV = $('input[name=js-snpV]').val();
//   let userInfo = 
//     {"firstName": fName,
//     "lastName": lName, 
//     "username": uname, 
//     "password": pword,
//     "snpVariant": snpV
//     };
//   console.log(userInfo);
//   let settings = {
//       url: POST_URL,
//       dataType: 'json',
//       data: JSON.stringify(userInfo),
//       contentType: "application/json",
//       type: 'POST',
//       // success: retrievePage(serverBase),
//       // success: returnToStartPage(state, 'start'),
//       success: function(data) {
//         if (data) {
//         window.location.href="/login"
//         }
//       },
//       error: reportError
//   };
//   $.ajax(settings);
// }


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

