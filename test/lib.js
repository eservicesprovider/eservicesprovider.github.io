// Set basic variables
var oAuthEndPoint = "https://accounts.google.com/o/oauth2/auth";
var oAuthClientID = "702841265150-iaravt3jmu0c67k892pivj9kgkb8dbco.apps.googleusercontent.com";
var oAuthScope = "https://www.googleapis.com/auth/userinfo.profile";

// Check if page is secure
if (IsSecure()) {
    // Check url for token
    if (GetURLParameter("access_token") != undefined) {
        // Make request if token is avalible
        LoadUserInfo(GetURLParameter("access_token"), GetURLParameter("expires_in"));
    }
}

// Checks if the page is secured
// If it is it will show the login button
// If not it will show the button for switching to https
function IsSecure() {
    var retval = false;

    if (location.protocol === 'https:') {
        retval = true;
        // Set the login href
        $("#btnGoogleOAuth").attr("href", GetOAuthURL());

        // Show demo and hide redirect
        $("#login").show();
        $("#redirect").hide();
    } else {
        // Build the redirect link
        var a = document.createElement('a');
        a.href = document.referrer;
        $("#btnSwitchToSSL").attr("href", ['https://', a.host, a.pathname].join('\n'));
        a = '';

        // Hide demo and show redirect
        $("#login").hide();
        $("#redirect").show();
    }

    return retval;
}

// Function for building the oauth url for the authentication link
function GetOAuthURL() {
    // Get the referrer (URL of the JSFiddle)
    var a = document.createElement('a');
    a.href = document.referrer;

    // Replace the jsfiddle.net with the fiddle.jshell.net domain
    var redirect_uri = ['https://fiddle.jshell.net', a.pathname].join('');
    a = '';

    // URL Encode parameters
    var redirect_uri = encodeURIComponent(redirect_uri); // Get current URL
    var client_id = encodeURIComponent(oAuthClientID);
    var scope = encodeURIComponent(oAuthScope);

    // Build the actuall url
    var oauth_url = oAuthEndPoint + "?client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&scope=" + scope + "&response_type=token";

    return oauth_url;
}

function LoadUserInfo(access_token, expires_in) {
    $.ajax({
        url: 'https://www.googleapis.com/userinfo/v2/me',
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (data) {
            // Hide login
            $("#login").hide();

            // Populate demo, img and name
            $("#user_pic").attr("src", data.picture);
            $("#user_name").attr("href", data.link);
            $("#user_name").text(data.name);

            // Show raw data
            for (var property in data) {
                if (data.hasOwnProperty(property)) {
                    $("#raw_data").append("<b>" + property + ":</b>" + data[property] + "<br/>");
                }
            }

            // Display demo
            $("#demo").show();
        },
        error: function () {
            $('#demo').html('<p>An error has occurred</p>');
        }
    });
}

// Function for extracting URL parameters returned to the page after oauth
function GetURLParameter(sParam) {
    var sPageURL = window.parent.location.hash.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}