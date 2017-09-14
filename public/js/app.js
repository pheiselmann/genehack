const serverBase = '/';
const PROFILE_URL = serverBase + 'account';
const LOGIN_URL = serverBase + 'api/auth/login';


/* Including state router from movie project */
let state = {
  route: 'start'
};

// State modification functions
function setRoute(state, route) {
  state.route = route;
}

// Render functions
function renderApp(state, elements) {
  if (state.route === 'start') {
      retrievePage("/", 
      	{
      		url: "/",
      		dataType: 'json',
      		contentType: "text/html",
      		type: 'GET',
      		success: displayPage
  		  }
    );
  } else if (state.route === 'account') {
    retrievePage(PROFILE_URL,
        {
          dataType: 'json',
          contentType: "text/html",
          beforeSend: function (request)
          {
             request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
          },
          type: 'GET',
          success: displayPage
        }
      );
  } else if (state.route === 'login') {
  	retrievePage(LOGIN_URL,

    );
  } else if (state.route === 'logout') {
    deleteJWT();
    retrievePage(serverBase);
  }; 
}

function storeJWT(data) {
    //put JWT in local storage
    localStorage.setItem('token', token);
    console.log('JWT in local storage: ' + localStorage.getItem('token'));
    // redirect to account page:
    setRoute(state, 'account');
    renderApp(state, {});
}

function submitLogin(e) {
  e.preventDefault();
  let uname = $('input[name=js-username]').val();
  //store username
  localStorage.setItem('uname', uname);
  let pword = $('input[name=js-password]').val();
  let usernamePassword = {"username": uname, "password": pword};
  console.log(usernamePassword);
  let settings = {
      url: LOGIN_URL,
      dataType: 'json',
      data: JSON.stringify(usernamePassword),
      contentType: "application/json",
      type: 'POST',
      success: storeJWT
  };
  $.ajax(settings);
}

function retrievePage(url, options) {
	$.ajax(url, options);
}

function displayPage(data) {
	$("html").text(data);
}