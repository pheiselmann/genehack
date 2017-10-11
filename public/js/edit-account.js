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

function handleError(data, response, status, error) {
    reportError(response, status, error);
    console.log("handleError firing");
    if (data.snpVariant === '' || JSON.stringify(response.responseJSON.message) === "\"Incorrect snpVariant\"")
    {
        console.log("Incorrect snp criteria met.");
        setRoute(state, 'snpVariant-incorrect');
        renderApp(state, PAGE_ELEMENTS);
    }
}

function reportError(response, status, error) {
  console.log("Response: ", response);
  console.log("Status: ", status);
  console.log("Error: ", error);
  console.log("Response Location:", JSON.stringify(response.responseJSON.location));
  console.log("Response Message:", JSON.stringify(response.responseJSON.message));
};


function watchSubmit() {
  $("form[name='js-edit-account-submit-form']").submit(function(event) {
    event.preventDefault();
    let snpV = $(this).find('.js-snpV').val();
    let userInfo = {"snpVariant": snpV};
    editAccount(userInfo);
  });
  $('.js-back-to-profile').submit(function(e) {
        e.preventDefault();
        window.location.href="/profile";
  });
}

$("form[name='js-edit-account-submit-form-snpVariant-incorrect']").submit(function(event) {
    event.preventDefault();
    let snpV = $(this).find('.js-snpV').val();
    let userInfo = {"snpVariant": snpV};
    editAccount(userInfo);
});

const PAGE_ELEMENTS = {
  'edit-account': $('.edit-account'),
  'snpVariant-incorrect': $('.edit-account-snpVariant-incorrect')
};


$(function() {
  renderApp(state, PAGE_ELEMENTS);
  watchSubmit();
}); 