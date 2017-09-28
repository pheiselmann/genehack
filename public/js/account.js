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

function displayProfile(data) {
  renderApp(state, PAGE_ELEMENTS);
  $('body').append(
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

function displayUserAccountInfo(data) {
    $('body').append(
        '<p>' + 'Result: ' + data.data + '</p>' +
     '<p>' + 'Name: ' + data.name + '</p>' +
     '<p>' + 'username: ' + data.username + '</p>' +
     '<p>' + 'snpVariant: ' + data.snpVariant + '</p>' +
        '<p>' + 'token: ' + localStorage.getItem('token') + '</p>');
}

function reportError(error) {
  console.log("Error: ", error);
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
});
