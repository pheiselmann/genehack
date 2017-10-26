// Review page routing

// Initial load sets route to empty
let state = {
    route: ''
}

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

// Ajax call to protected endpoint to GET variant currently
// in user account - either leads to success function that 
// displays user's report, or leads to error reporting function
function getUserReport(callbackFn) {
  var settings = {
    url: '/api/protected',
    dataType: 'json',
    contentType: "application/json",
    beforeSend: function (request)
    {
       request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
    },
    type: 'GET',
    success: displayUserReport,
    error: reportError
  };
  $.ajax(settings);
}

// Report stack error
function reportError(error) {
  console.log("Error: ", error);
}

// Sets route/renders page view corresponding to variant
// currently in user account
function displayUserReport(data) {
    if (data.snpVariant === 'TT') {
      setRoute(state, 'TT');
      renderApp(state, PAGE_ELEMENTS);
    } else if (data.snpVariant === 'GT') {
      setRoute(state, 'GT');
      renderApp(state, PAGE_ELEMENTS);
    } else if (data.snpVariant === 'GG') {
      setRoute(state, 'GG');
      renderApp(state, PAGE_ELEMENTS);
    }
}

// Called by ready function, and in turn calls
// Ajax function that retrieves current user variant
// for corresponding report page view
function getAndDisplayUserReport() {
    getUserReport(displayUserReport);
}

// State route variables
const PAGE_ELEMENTS = {
  'TT': $('.review-TT'),
  'GT': $('.review-GT'),
  'GG': $('.review-GG')
};

// Event handler for directing back to profile page
// instead of viewing report
$('.js-back-to-profile').click(function(e) {
        e.preventDefault();
        window.location.href="/profile";
  });

// Ready function fires upon page load, calling 
// function that leads to report page view
$(function() {
    getAndDisplayUserReport();
})
