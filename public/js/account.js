const serverBase = '/';
const PROFILE_URL = serverBase + 'account';
const LOGIN_URL = serverBase + 'login';

function getUserInfo(callbackFn) {
  var settings = {
    url: PROFILE_URL,
    dataType: 'json',
    contentType: "application/json",
    beforeSend: function (request)
    {
       request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
    },
    type: 'GET',
    success: callbackFn,
    error: reportError
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

function getAndDisplayUserAccountInfo() {
    getUserInfo(displayUserAccountInfo);
}

function reportError(error) {
  console.log("Error: ", error);
}

$(function() {
   getAndDisplayUserAccountInfo();
   console.log("getAndDisplayUserAccountInfo fired")
});
