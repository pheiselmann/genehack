$(function() {
    $('.js-logout').onclick(function(e) {
        e.preventDefault();
        let settings = {
            url: 'api/logout',
            // dataType: 'json',
            contentType: "application/json",
            type: 'GET',
            // success: getAndDisplayUserAccountInfo
            success: clearJWT
        };
        $.ajax(settings);
    });
});


function clearJWT() {
    localStorage.removeItem('token');
    
}