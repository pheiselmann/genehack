
$(function() {
    $('.js-delete-account').click(function(e) {
        e.preventDefault();
        $('.profile').hide();
        $('.profile-actions').hide();
        $('.js-logout').hide();
        $('.js-delete-account').hide();
        $('.js-edit-account').hide();
        $('.js-view-report').hide();
        $('.js-profile-delete-sure').show();
        
    });
    $('.js-delete-account-sure').submit(function(e) {
        e.preventDefault();
        console.log("delete button firing");
        deleteAccount();
    });
    $('.js-back-to-profile').submit(function(e) {
        e.preventDefault();
        window.location.href="/profile";
    });
}); 

function deleteAccount(){
  var settings = {
    url: '/api/protected',
    dataType: 'json',
    contentType: "application/json",
    beforeSend: function (request)
    {
       request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
    },
    type: 'DELETE',
    success: function(data) {
        clearJWT();
        window.location.href="/";
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