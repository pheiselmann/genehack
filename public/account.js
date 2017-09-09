//MARK'S CHANGES

// const serverBase = '/';
// const PROFILE_URL = serverBase + 'api/protected';
// const LOGIN_URL = serverBase + 'api/auth/login';
// const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJNaWtlIE11dGFudCIsInVzZXJuYW1lIjoibXV0YW50bWlrZXl5eXl5eXkifSwiaWF0IjoxNTA0MjQ5NjM2LCJleHAiOjE1MDQ4NTQ0MzYsInN1YiI6Im11dGFudG1pa2V5eXl5eXl5In0.8Nx8gZuAiSD0vBG3ROFlORUbGTAIrcAaKBpMa6G3At4";
// // const token = "Bearer " + JSON.stringify(localStorage.getItem('token'));
// // const currentUser = JSON.stringify({username: "mutantmikeyyyyyyy"});


// function getUserInfo(callbackFn) {
//   var settings = {
//     url: PROFILE_URL,
//     dataType: 'json',
//     beforeSend: function (request)
//     {
//        request.setRequestHeader("Authorization", token);
//     },
//     contentType: "application/json",
//     type: 'GET',
//     success: callbackFn
//   };
//   $.ajax(settings);
// }


// function displayUserAccountInfo(data) {
//     $('body').append(
//         '<p>' + 'Result: ' + data.data + '</p>' +
//     	'<p>' + 'Name: ' + data.name + '</p>' +
//     	'<p>' + 'username: ' + data.username + '</p>' +
//     	'<p>' + 'snpVariant: ' + data.snpVariant + '</p>' +
//         '<p>' + 'token: ' + localStorage.getItem('token') + '</p>');
// }


// function getAndDisplayUserAccountInfo() {
//     getUserInfo(displayUserAccountInfo);
// }


// //callback fn for login ajax call
// function storeJWT(data) {
//     //put JWT in local storage
//     localStorage.setItem('token', data);
//     let currentToken = localStorage.getItem('token');
//     //show that object has been added to local storage 
//     $('body').append('<p>' + 'JWT in local storage: ' + currentToken + '</p>');
// }


// function watchLoginSubmit() {
//     login(storeJWT);
// }


// $(function() {
//     $('.js-login-submit-form').submit(function(e) {
//         e.preventDefault();
//         let uname = $('input[name=js-username]').val();
//         let pword = $('input[name=js-password]').val();
//         let usernamePassword = {"username": uname, "password": pword};
//         let settings = {
//             url: LOGIN_URL,
//             dataType: 'json',
//             data: JSON.stringify(usernamePassword),
//             contentType: "application/json",
//             type: 'POST',
//             success: getAndDisplayUserAccountInfo
//         };
//         $.ajax(settings);
//     });
// });


//END OF MARK'S CHANGES



//ORIGINAL CODE
// const serverBase = '/';
// const PROFILE_URL = serverBase + 'api/protected';
// const LOGIN_URL = serverBase + 'api/auth/login';
// const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJNaWtlIE11dGFudCIsInVzZXJuYW1lIjoibXV0YW50bWlrZXl5eXl5eXkifSwiaWF0IjoxNTA0MjQ5NjM2LCJleHAiOjE1MDQ4NTQ0MzYsInN1YiI6Im11dGFudG1pa2V5eXl5eXl5In0.8Nx8gZuAiSD0vBG3ROFlORUbGTAIrcAaKBpMa6G3At4";
// // const token = "Bearer " + JSON.stringify(localStorage.getItem('token'));
// const currentUser = JSON.stringify({username: "mutantmikeyyyyyyy"});


// function getUserInfo(callbackFn) {
//   var settings = {
//     url: PROFILE_URL,
//     dataType: 'json',
//     beforeSend: function (request)
//     {
//        request.setRequestHeader("Authorization", token);
//     },
//     contentType: "application/json",
//     type: 'GET',
//     success: callbackFn
//   };
//   $.ajax(settings);
// }


// function displayUserAccountInfo(data) {
//     $('body').append(
//         '<p>' + 'Result: ' + data.data + '</p>' +
//         '<p>' + 'Name: ' + data.name + '</p>' +
//         '<p>' + 'username: ' + data.username + '</p>' +
//         '<p>' + 'snpVariant: ' + data.snpVariant + '</p>' +
//         '<p>' + 'token: ' + localStorage.getItem('token') + '</p>');
// }


// function getAndDisplayUserAccountInfo() {
//     getUserInfo(displayUserAccountInfo);
// }


// function login(callbackFn) {
//     $('.js-login-submit-form').submit(function(e) {
//         e.preventDefault();
//         let uname = $('input[name=js-username]').val();
//         let pword = $('input[name=js-password]').val();
//         let usernamePassword = {"username": uname, "password": pword};
//         let settings = {
//             url: LOGIN_URL,
//             dataType: 'json',
//             data: JSON.stringify(usernamePassword),
//             contentType: "application/json",
//             type: 'POST',
//             success: callbackFn
//         };
//         $.ajax(settings);
//     })
// }


// //callback fn for login ajax call
// function storeJWT(data) {
//     //put JWT in local storage
//     localStorage.setItem('token', data);
//     let currentToken = localStorage.getItem('token');
//     //show that object has been added to local storage 
//     $('body').append('<p>' + 'JWT in local storage: ' + currentToken + '</p>');
// }

// function watchLoginSubmit() {
//     login(storeJWT);
// }
//END OF ORIGINAL CODE


//EXPERIMENTS USING MARK'S CHANGES
const serverBase = '/';
const PROFILE_URL = serverBase + 'api/protected';
const LOGIN_URL = serverBase + 'api/auth/login';
// const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJNaWtlIE11dGFudCIsInVzZXJuYW1lIjoibXV0YW50bWlrZXl5eXl5eXkifSwiaWF0IjoxNTA0MjQ5NjM2LCJleHAiOjE1MDQ4NTQ0MzYsInN1YiI6Im11dGFudG1pa2V5eXl5eXl5In0.8Nx8gZuAiSD0vBG3ROFlORUbGTAIrcAaKBpMa6G3At4";
// const token = "Bearer " + JSON.stringify(localStorage.getItem('token'));
// const currentUser = JSON.stringify({username: "bobby"});


// function getUserInfo(token, callbackFn) {
function getUserInfo(callbackFn) {
  var settings = {
    url: PROFILE_URL,
    dataType: 'json',
    // data: currentUser,
    beforeSend: function (request)
    {
       // request.setRequestHeader("Authorization", "Bearer " + token);
       request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
    },
    contentType: "application/json",
    type: 'GET',
    success: callbackFn
  };
  $.ajax(settings);
}


function displayUserAccountInfo(data) {
    $('body').append(
        '<p>' + 'Result: ' + data.data + '</p>' +
     '<p>' + 'Name: ' + data.name + '</p>' +
     '<p>' + 'username: ' + data.username + '</p>' +
     '<p>' + 'snpVariant: ' + data.snpVariant + '</p>' +
        '<p>' + 'token: ' + localStorage.getItem('token') + '</p>');
}


// function getAndDisplayUserAccountInfo(token) {
function getAndDisplayUserAccountInfo() {
    // getUserInfo(token, displayUserAccountInfo);
    getUserInfo(displayUserAccountInfo);

}


//callback fn for login ajax call
function storeJWT(data) {
    //put JWT in local storage
    localStorage.setItem('token', data.authToken);
    //let currentToken = localStorage.getItem('token');
    //show that object has been added to local storage 
    // $('body').append('<p>' + 'JWT in local storage: ' + JSON.stringify(currentToken) + '</p>');
    $('body').append('<p>' + 'JWT in local storage: ' + localStorage.getItem('token') + '</p>');
    // getAndDisplayUserAccountInfo(currentToken);
    getAndDisplayUserAccountInfo();
}

// function watchLoginSubmit() {
//     login(storeJWT);
// }


$(function() {
    $('.js-login-submit-form').submit(function(e) {
        e.preventDefault();
        let uname = $('input[name=js-username]').val();
        //store username
        localStorage.setItem('uname', uname);
        let pword = $('input[name=js-password]').val();
        let usernamePassword = {"username": uname, "password": pword};
        console.log(usernamePassword);
        let settings = {
            url: LOGIN_URL,
            dataType: 'json',
            data: JSON.stringify(usernamePassword),
            contentType: "application/json",
            type: 'POST',
            // success: getAndDisplayUserAccountInfo
            success: storeJWT
        };
        $.ajax(settings);
    });
});

//END OF EXPERIMENTS USING MARK'S CHANGES