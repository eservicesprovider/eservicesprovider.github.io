      //platform
	  function onSignIn(googleUser) {
		  var profile = googleUser.getBasicProfile();
		  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
		  console.log('Name: ' + profile.getName());
		  console.log('Image URL: ' + profile.getImageUrl());
		  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

		  //show logout button
		  $("#google-auth-button").text("<a href='#' onclick='signOut();''>Sign out</a> &nbsp  &nbsp <a class='read' href='app/admin'> Admin </a> <button type='button' class='btn btn-outline-primary'>Primary</button>");	 
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

	  //messages


	  //friends


	  //exchange

	  //wallets

	  //market