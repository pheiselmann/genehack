$(function() {
    $('.js-logout').submit(function(e) {
        e.preventDefault();
        clearJWT();
        window.location.href="/"
    });
}); 


function clearJWT() {
    localStorage.removeItem('token');
    
}