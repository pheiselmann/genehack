// Delete account routing

// Ready function fires upon profile page load
$(function() {
    // Event handler for delete account button,
    // hides all page views except for page that
    // asks if user is sure they want to delete account
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
    // Event handler for click on delete account button
    // on page asking if user is sure wants to delete,
    // calls function that actually deletes account
    $('.js-delete-account-sure').click(function(e) {
        e.preventDefault();
        console.log("delete button firing");
        deleteAccount();
    });
    // Event handler for going back to profile, instead
    // of deleting account on page asking if user sure
    // wants to delete account
    $('.js-back-to-profile').click(function(e) {
        e.preventDefault();
        window.location.href="/profile";
    });
}); 

// Ajax call to protected endpoint where account profile
// is deleted - either leads to success function which 
// clears Jwt from local storage and directs to home page,
// or leads to error reporting function
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

// Removes Jwt from local storage
function clearJWT() {
    localStorage.removeItem('token');
}

// Reports stack error
function reportError(error) {
  console.log("Error: ", error);
}