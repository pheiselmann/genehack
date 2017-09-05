//WE NEED TO CREATE TWO MORE FUNCTIONS

// this function stays the same when we connect
// to real API later

//create login ajax call to retrieve JWT
// create login jwt storage function 



// THIS IS WHERE I RETRIEVE AND LOCALLY STORE JWT
//Store locally
    // if (typeof window !== 'undefined') {
    //   window.sessionStorage.setItem('token', authToken);
    // }
//WHEN GET USER INFO IS SUCCESSFUL, THIS CALLED BACK
//SO INSIDE THIS CALLBACK, RETRIEVE TOKEN INFO FROM DATA 


// RETRIEVE LOCALLY STORED JWT. . . TO ACCESS PROFILE INFO

const serverBase = '/';
const PROFILE_URL = serverBase + 'api/protected';
const LOGIN_URL = serverBase + 'api/auth/login';
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJNaWtlIE11dGFudCIsInVzZXJuYW1lIjoibXV0YW50bWlrZXl5eXl5eXkifSwiaWF0IjoxNTA0MjQ5NjM2LCJleHAiOjE1MDQ4NTQ0MzYsInN1YiI6Im11dGFudG1pa2V5eXl5eXl5In0.8Nx8gZuAiSD0vBG3ROFlORUbGTAIrcAaKBpMa6G3At4";
const currentUser = JSON.stringify({username: "mutantmikeyyyyyyy"});


// START WITH LOGIN, AND STORE TOKEN LOCALLY
// function login() {
// //Makes request to auth/login endpoint and retrieve JWT - success callback is where 
// // JWT gets stored (callback function called, for example, "storeJWT")
// }


function getUserInfo(callbackFn) {
  var settings = {
    url: PROFILE_URL,
    dataType: 'json',
    //data: JSON.stringify({username: "bobcat", password: "youruncle"}),
    // data: currentUser,
    beforeSend: function (request)
    {
       request.setRequestHeader("Authorization", token);
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
    	//'<p>' + 'password: ' + data.password + '</p>' +
    	'<p>' + 'snpVariant: ' + data.snpVariant + '</p>' +
        '<p>' + 'token: ' + localStorage.getItem('token') + '</p>');
}


// this function can stay the same even when we
// are connecting to real API
function getAndDisplayUserAccountInfo() {
    getUserInfo(displayUserAccountInfo);
}

//callback fn for login ajax call
function storeJWT(data) {
    //put JWT in local storage
    localStorage.setItem('token', data);
    let currentToken = localStorage.getItem('token');
    //show that object has been added to local storage 
    $('body').append('<p>' + 'JWT in local storage: ' + currentToken + '</p>');
}

function watchLoginSubmit() {
    login(storeJWT);
}

$(function() {
    $('.js-login-submit-form').submit(function(e) {
        e.preventDefault();
        let uname = $('input[name=js-username]').val();
        let pword = $('input[name=js-password]').val();
        let usernamePassword = {"username": uname, "password": pword};
        let settings = {
            url: LOGIN_URL,
            dataType: 'json',
            data: JSON.stringify(usernamePassword),
            contentType: "application/json",
            type: 'POST',
            success: getAndDisplayUserAccountInfo
        };
        $.ajax(settings);
    });
});
