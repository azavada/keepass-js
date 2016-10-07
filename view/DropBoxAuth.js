function DropBoxAuth() {

    this.login = function(callback) {
        var authUrl = "https://www.dropbox.com/1/oauth2/authorize?" +
            "response_type=token&" +
            "client_id=ykk5iijr0sarpyk&" +
            "redirect_uri=" + encodeURIComponent(chrome.identity.getRedirectURL('dropbox'));

        chrome.identity.launchWebAuthFlow({'url': authUrl, 'interactive': true}, function (response) {
            if (!chrome.runtime.lastError && response.length > 0) {
                var token = utils.parseQueryString(response.substring(response.indexOf("#") + 1)).access_token;

                callback(token);

            }
        });
    };

    this.logout = function(token) {
        var dbx = new Dropbox({accessToken: token});
        dbx.authTokenRevoke();
    };
}