//use create-account.js as model
//need state var, page elements, renderApp
//store values for PUT input values
//need handleError function

$(function() {
    $('.js-edit-account').submit(function(e) {
        e.preventDefault();
        console.log("delete button firing");
        deleteAccount();
    });
}); 

function deleteAccount(){
  var settings = {
    // url: PROFILE_URL,
    url: '/api/protected',
    dataType: 'json',
    contentType: "application/json",
    beforeSend: function (request)
    {
       request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
    },
    type: 'DELETE',
    success: function(data) {
      // if (data.username === localStorage.getItem('uname')) {
        clearJWT();
        window.location.href="/";
      // }
    },
    error: reportError
  };
  $.ajax(settings);
}


function clearJWT() {
    localStorage.removeItem('token');
}

function reportError(error) {
  console.log("Error: ", error);
}