(function() {
    // console.log(chrome.identity.getRedirectURL('dropbox'));
    //
    // var authUrl = "https://www.dropbox.com/1/oauth2/authorize?" +
    //     "response_type=token&" +
    //     "client_id=ykk5iijr0sarpyk&" +
    //     "redirect_uri=" + encodeURIComponent(chrome.identity.getRedirectURL('dropbox'));
    //
    // console.log(authUrl);
    // chrome.identity.launchWebAuthFlow({'url': authUrl, 'interactive': true}, function(response) {
    //     console.log(chrome.runtime.lastError);
    //     console.log(response)
    // });

    // require("dropbox-sdk");

    // var ACCESS_TOKEN = '';
    //
    // var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
    // dbx.filesListFolder({path: ''})
    //     .then(function(response) {
    //         console.log(response);
    //         response.entries.forEach(function(item){
    //             console.log(item.path_display);
    //         });
    //     })
    //     .catch(function(error) {
    //         console.error(error);
    //     });
})();