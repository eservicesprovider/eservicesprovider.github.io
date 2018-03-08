var auth2; // The Sign-In object.
var googleUser; // The current user.


$(document).ready(function() {

	$('.popup-with-zoom-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
																
});
     
/**
 * Calls startAuth after Sign in V2 finishes setting up.
 */
var appStart = function() {
  gapi.load('auth2', initSigninV2);
};      


/**
 * Initializes Signin v2 and sets up listeners.
 */
var initSigninV2 = function() {

  auth2 = gapi.auth2.init({
      client_id: 'CLIENT_ID.apps.googleusercontent.com',
      scope: 'profile'
  });

  // Listen for sign-in state changes.
  auth2.isSignedIn.listen(signinChanged);

  // Listen for changes to current user.
  auth2.currentUser.listen(userChanged);

  // Sign in the user if they are currently signed in.
  if (auth2.isSignedIn.get() == true) {
    auth2.signIn();
  }

  // Start with the current live values.
  refreshValues();
};

/**
 * Listener method for sign-out live value.
 *
 * @param {boolean} val the updated signed out state.
 */
var signinChanged = function (val) {
  console.log('Signin state changed to ', val);
  document.getElementById('signed-in-cell').innerText = val;
};

/**
 * Listener method for when the user changes.
 *
 * @param {GoogleUser} user the updated user.
 */
var userChanged = function (user) {
  console.log('User now: ', user);
  googleUser = user;
  updateGoogleUser();
  document.getElementById('curr-user-cell').innerText =
    JSON.stringify(user, undefined, 2);
};

/**
 * Updates the properties in the Google User table using the current user.
 */
var updateGoogleUser = function () {
  if (googleUser) {
    document.getElementById('user-id').innerText = googleUser.getId();
    document.getElementById('user-scopes').innerText =
      googleUser.getGrantedScopes();
    document.getElementById('auth-response').innerText =
      JSON.stringify(googleUser.getAuthResponse(), undefined, 2);
  } else {
    document.getElementById('user-id').innerText = '--';
    document.getElementById('user-scopes').innerText = '--';
    document.getElementById('auth-response').innerText = '--';
  }
};

/**
 * Retrieves the current user and signed in states from the GoogleAuth
 * object.
 */
var refreshValues = function() {
  if (auth2){
    console.log('Refreshing values...');

    googleUser = auth2.currentUser.get();

    document.getElementById('curr-user-cell').innerText =
      JSON.stringify(googleUser, undefined, 2);
    document.getElementById('signed-in-cell').innerText =
      auth2.isSignedIn.get();

    updateGoogleUser();
  }
}


//platform
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  //show logout button
  //$("#google-auth-button").text("<a href='#' onclick='signOut();''>Sign out</a> &nbsp  &nbsp <a class='read' href='app/admin'> Admin </a> <button type='button' class='btn btn-outline-primary'>Primary</button>");	 
  $("location").attr('href', 'http://eprofitservice.com/app/admin');
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
  	console.log('User signed out.');
});


//account manager
function registerUser(){}

function createXMRWallet(){}

function createCryptoExchangeAccount(){}

function getFriends(){}

function getMissingData(){}

function getMessages(){}

function sendMessage(){}

function writeToLocalDB(){}

function readFromLocalDB(){}

function writeBlockChainValue(){}

function readBlockChainValue(){}

function registerSocialMediaAccount(){}

//social media
function shareToSocialMedia(){}

//messages


//friends


//exchange

	
//wallets


//market