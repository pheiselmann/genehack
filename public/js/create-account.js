const serverBase = '/';
const POST_URL = serverBase + 'api/users';

$(function() {
    $('.js-create-account-submit-form').submit(function(e) {
        e.preventDefault();
        let fName = $('input[name=js-fName]').val();
        let lName = $('input[name=js-lName]').val();
        let uname = $('input[name=js-uname]').val();
        let pword = $('input[name=js-pword]').val();
        let snpV = $('input[name=js-snpV]').val();
        let userInfo = 
            {"firstName": fName,
            "lastName": lName, 
            "username": uname, 
            "password": pword,
            "snpVariant": snpV
            };
        console.log(userInfo);
        let settings = {
            url: POST_URL,
            dataType: 'json',
            data: JSON.stringify(userInfo),
            contentType: "application/json",
            type: 'POST',
            success: retrievePage(serverBase),
            error: reportError
        };
        $.ajax(settings);
    });
});