//use create-account.js as model
//need state var, page elements, renderApp
//store values for PUT input values
//need handleError function
let state = {
  route: 'edit-account'
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

function editAccount(userInfo){
  console.log("editAccount firing");
  console.log("userInfo: " + JSON.stringify(userInfo));
  var settings = {
    // url: PROFILE_URL,
    url: '/api/protected',
    dataType: 'json',
    data: JSON.stringify(userInfo),
    contentType: "application/json",
    beforeSend: function (request)
    {
       request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
    },
    type: 'PUT',
    success: function(data) {
        if (data) {
        window.location.href="/profile"
        }
      },
    // error: handleError
    //replace with handleError that routes to error page
    error: reportError
  };
  $.ajax(settings);
}


function reportError(error) {
  console.log("Error: ", error);
}


function watchSubmit() {
  $("form[name='js-edit-account-submit-form']").submit(function(event) {
    event.preventDefault();
    // submitAccountInfoToAjaxFn(event);
    let fName = $(this).find('.js-fName').val();
    let lName = $(this).find('.js-lName').val();
    let snpV = $(this).find('.js-snpV').val();
    let userInfo = 
      {"firstName": fName,
      "lastName": lName, 
      "snpVariant": snpV
      };
    editAccount(userInfo);
  });
}

const PAGE_ELEMENTS = {
  'edit-account': $('.edit-account'),
  'edit-account-error': $('.edit-account-snpVariant-incorrect')
};


$(function() {
  renderApp(state, PAGE_ELEMENTS);
  watchSubmit();
}); 