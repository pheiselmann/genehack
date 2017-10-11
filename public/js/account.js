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
      } else {
        reportNoSNP();
      }
    },
    error: reportError
  };
  $.ajax(settings);
}

function displayProfile(data) {
  renderApp(state, PAGE_ELEMENTS);
  $('.profile-information').append(
     '<p class="profile-name">' + 'Name: ' + data.name + '</p>' +
     '<p class="profile-username">' + 'username: ' + data.username + '</p>' +
     '<p class="profile-snp">' + 'snpVariant: ' + data.snpVariant + '</p>'
     );
}


function getAndDisplayUserAccountInfo() {
    getUserInfo(displayProfile);
}

function reportNoSNP() {
  setRoute(state, 'error-no-report');
  renderApp(state, PAGE_ELEMENTS);
  $('.js-profile-actions').hide();
}

function reportError(error) {
  console.log("Error: ", error);
}

function retrieveEditAccountPage() {
  window.location.href="/edit-account"
}

const PAGE_ELEMENTS = {
  'profile': $('.profile'),
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
