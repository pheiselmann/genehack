$(function() {
    $('.js-logout').click(function(e) {
        e.preventDefault();
        clearJWT();
        window.location.href="/"
    });
}); 

function clearJWT() {
    // localStorage.removeItem('token');
    localStorage.clear();
}