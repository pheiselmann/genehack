// Account profile page routing

// Initial load sets route to profile page
let state = {
  route: 'profile'
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
}

// Ajax call to Jwt protected endpoint either
// leads to success callback fn that retrieves user
// account info, or error reporting function
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

// Ajax call to Jwt protected endpoint either
// leads to success callback fn that calls user
// report pages, success function reporting lack of 
// useable snp, or error reporting function
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

// Render profile page and append account info
function displayProfile(data) {
  renderApp(state, PAGE_ELEMENTS);
  $('.profile-information').append(
     '<p class="profile-info">' + 'Name: ' + data.name + '</p>' +
     '<p class="profile-info">' + 'username: ' + data.username + '</p>' +
     '<p class="profile-info">' + 'Variant: ' + data.snpVariant + '</p>'
     );
}

// Call Ajax function to display account info
function getAndDisplayUserAccountInfo() {
    getUserInfo(displayProfile);
}

// Set route and render error page reporting
// lack of useable snp
function reportNoSNP() {
  setRoute(state, 'error-no-report');
  renderApp(state, PAGE_ELEMENTS);
  $('.js-profile-actions').hide();
}

// Report stack error
function reportError(error) {
  console.log("Error: ", error);
}

// Direct to edit account page
function retrieveEditAccountPage() {
  window.location.href="/edit-account"
}

// State route variables
const PAGE_ELEMENTS = {
  'profile': $('.profile'),
  'error-no-report': $('.profile-error-no-report')
};

// Ready function fires upon page load, displaying
// user account info
$(function() {
   getAndDisplayUserAccountInfo();
   console.log("getAndDisplayUserAccountInfo fired")
   
// Event handler calls function that directs to 
// edit account page
  $('.js-edit-account').click(function(e) {
    e.preventDefault();
    console.log("edit account button firing");
    retrieveEditAccountPage();
  });

// Event handler calls Ajax function to display 
// user report
  $('.js-view-report').click(function(e) {
    e.preventDefault();
    console.log("view report button firing");
    getReport();
  });
});
