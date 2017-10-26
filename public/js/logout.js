//  Logout from profile page

// Ready function fires upon profile page load
$(function() {
  // Event handler for logout button, removes 
  // Jwt from local storage and directs to home page
  $('.js-logout').click(function(e) {
    e.preventDefault();
    clearJWT();
    window.location.href="/"
  });
}); 

// Remove Jwt from local storage
function clearJWT() {
    localStorage.clear();
}