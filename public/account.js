// this is mock data, but when we create our API
// we'll have it return data that looks like this
// var MOCK_USER_INFO = {
// 	"name": "Gene Geneticist",
// 	"username": "genemachine",
// 	"password": "luckyone",
// 	"snpVariant": "AA",
//     "report": "homozygous dominant for rs1801131"
// };
// this function's name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn

// function getUserInfo(callbackFn) {
//     // we use a `setTimeout` to make this asynchronous
//     // as it would be with a real AJAX call.
// 	setTimeout(function(){ callbackFn(MOCK_USER_INFO)}, 100);
// }


const serverBase = '/';
const PROFILE_URL = serverBase + 'api/protected';

function getUserInfo(callbackFn) {
  var settings = {
    url: PROFILE_URL,
    // data: {
    //   username: 'bobcat',
    //   password: 'youruncle'
    // },
    // dataType: 'json',
    data: JSON.stringify({username: "bobcat", password: "youruncle"}),
    contentType: "application/json",
    type: 'POST',
    success: callbackFn
  };
  $.ajax(settings);
}


// this function stays the same when we connect
// to real API later
function displayUserAccountInfo(data) {
    $('body').append(
    	'<p>' + 'Name: ' + data.name + '</p>' +
    	'<p>' + 'username: ' + data.username + '</p>' +
    	//'<p>' + 'password: ' + data.password + '</p>' +
    	'<p>' + 'snpVariant: ' + data.snpVariant + '</p>');
}


// this function can stay the same even when we
// are connecting to real API
function getAndDisplayUserAccountInfo() {
    getUserInfo(displayUserAccountInfo);
}


//  on page load do this
$(function() {
    getAndDisplayUserAccountInfo();
})
