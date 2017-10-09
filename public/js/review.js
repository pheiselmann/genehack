const serverBase = '/';
const GET_URL = serverBase + 'api/protected';

let state = {
    route: ''
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

function getUserReport(callbackFn) {
  var settings = {
    url: GET_URL,
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

function reportError(error) {
  console.log("Error: ", error);
}

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

function getAndDisplayUserReport() {
    getUserReport(displayUserReport);
}

const PAGE_ELEMENTS = {
  'TT': $('.review-TT'),
  'GT': $('.review-GT'),
  'GG': $('.review-GG')
};

$('.js-back-to-profile').submit(function(e) {
        e.preventDefault();
        window.location.href="/profile";
  });

//  on page load do this
$(function() {
    getAndDisplayUserReport();
})
