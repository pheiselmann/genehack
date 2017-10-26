//Edit account page routing

//Initial load sets route to edit account page
let state = {
  route: 'edit-account'
}

//Set route
function setRoute(state, route) {
  state.route = route;
}

//Iterate through amd hide page elements 
//except for element for current route
function renderApp(state, elements) {
  Object.keys(elements).forEach(function(route) {
    elements[route].hide();
  });
  console.log("Current state route:" + state.route);
  elements[state.route].show();
}

//Ajax call to protected endpoint where snp variant
//is edited in user account - either leads to success
//function which directs to profile page, or leads to
//error handling function
function editAccount(userInfo){
  console.log("editAccount firing");
  console.log("userInfo: " + JSON.stringify(userInfo));
  var settings = {
    url: '/api/protected',
    dataType: 'json',
    data: JSON.stringify(userInfo),
    contentType: "application/json",
    beforeSend: function (request)
    {
       request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
    },
    type: 'PUT',
    success: 
    function(data) {
        if (data) {
          window.location.href="/profile"
        }
      },
    error: handleError
  };
  $.ajax(settings);
}

//Call function that reports stack error and set route/render 
//unuseable variant error page according to error response location 
//and message 
function handleError(response, status, error) {
    reportError(response, status, error);
    console.log("handleError firing");
    if (JSON.stringify(response.responseJSON.message) === "\"Incorrect snpVariant\"")
    {
        console.log("Incorrect snp criteria met.");
        setRoute(state, 'snpVariant-incorrect');
        renderApp(state, PAGE_ELEMENTS);
    }
}

//Report stack error
function reportError(response, status, error) {
  console.log("Response: ", response);
  console.log("Status: ", status);
  console.log("Error: ", error);
  console.log("Response Location:", JSON.stringify(response.responseJSON.location));
  console.log("Response Message:", JSON.stringify(response.responseJSON.message));
};

//Called by ready function upon page load
function watchSubmit() {
  //Event handler for submission of new snp variant
  //which is then sent to Ajax function that calls account
  //PUT endpoint
  $("form[name='js-edit-account-submit-form']").submit(function(event) {
    event.preventDefault();
    let snpV = $(this).find('.js-snpV').val();
    let userInfo = {"snpVariant": snpV};
    editAccount(userInfo);
  });

  //Event handler for directing back to profile page,
  //instead of editing account snp variant
  $('.js-back-to-profile').click(function(e) {
        e.preventDefault();
        window.location.href="/profile";
  });
}

//Event handler for submission of new nsp variant from 
//unuseable variant error page - with new variant sent to 
//Ajax function that calls account PUT endpoint
$("form[name='js-edit-account-submit-form-snpVariant-incorrect']").submit(function(event) {
    event.preventDefault();
    let snpV = $(this).find('.js-snpV').val();
    let userInfo = {"snpVariant": snpV};
    editAccount(userInfo);
});

//State route variables
const PAGE_ELEMENTS = {
  'edit-account': $('.edit-account'),
  'snpVariant-incorrect': $('.edit-account-snpVariant-incorrect')
};

//Ready function fires upon page load,loads initial page view, and 
//calls initial event handler function
$(function() {
  renderApp(state, PAGE_ELEMENTS);
  watchSubmit();
}); 