const serverBase = '/';
const PROFILE_URL = serverBase + 'account';
const LOGIN_URL = serverBase + 'login';

let state = {
  route: 'profile'
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
}

function getUserInfo(callbackFn) {
  var settings = {
    // url: PROFILE_URL,
    url: '/api/protected',
    dataType: 'json',
    contentType: "application/json",
    beforeSend: function (request)
    {
       request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
    },
    type: 'GET',
    success: callbackFn,
    error: reportError
  };
  $.ajax(settings);
}

function getReport() {
  var settings = {
    // url: PROFILE_URL,
    url: '/api/protected',
    dataType: 'json',
    contentType: "application/json",
    beforeSend: function (request)
    {
       request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
    },
    type: 'GET',
    success: function(data) {
      if (data.snpVariant && data.snpVariant != '') {
        window.location.href="/review";
      }
    },
    // error: reportError
    error: reportNoSNP
  };
  $.ajax(settings);
}

function displayProfile(data) {
  renderApp(state, PAGE_ELEMENTS);
  // $('body').append(
  $('.profile').append(
     '<p>' + 'Name: ' + data.name + '</p>' +
     '<p>' + 'username: ' + data.username + '</p>' +
     '<p>' + 'snpVariant: ' + data.snpVariant + '</p>'
     );
  //add buttons for 1) edit 2) delete 3) review
}


function getAndDisplayUserAccountInfo() {
    // getUserInfo(displayUserAccountInfo);
    getUserInfo(displayProfile);
}

function reportNoSNP() {
  setRoute(state, 'profile-error-no-report');
  renderApp(state, PAGE_ELEMENTS);
}

function reportError(error) {
  console.log("Error: ", error);
}

function retrieveEditAccountPage() {
  //put ajax get request here to display current profile along with edit form
  window.location.href="/edit-account"
}

const PAGE_ELEMENTS = {
  'profile': $('.profile'),
  'edit': $('.profile-edit'),
  'edit-error': $('.profile-edit-error'),
  'delete': $('.profile-delete'),
  'sure': $('.profile-delete-sure'),
  'error-no-report': $('.profile-error-no-report')
};

$(function() {
   getAndDisplayUserAccountInfo();
   console.log("getAndDisplayUserAccountInfo fired")
   
  $('.js-edit-account').submit(function(e) {
    e.preventDefault();
    console.log("edit account button firing");
    retrieveEditAccountPage();
  });

  $('.js-view-report').submit(function(e) {
    e.preventDefault();
    console.log("view report button firing");
    getReport();
  });

});
