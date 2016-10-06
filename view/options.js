const DROPBOX_ACCESS_TOKEN = "dropbox-access-token";

$(function () {
    function loadDropStatus() {
        chrome.storage.local.get(null, function (items) {

            if (items.hasOwnProperty(DROPBOX_ACCESS_TOKEN)) {
                $("#dropbox").val("Logout Dropbox");
            } else {
                $("#dropbox").val("Use Dropbox");
            }

        });
    }

    function wrapObject(key, value) {
        var obj = {};
        obj[key] = value;
        return obj;
    }

    function addDropboxClickHandler() {
        $("#dropbox").click(function () {
            var $this = $(this);
            if ($this.val() === "Use Dropbox") {

                var authUrl = "https://www.dropbox.com/1/oauth2/authorize?" +
                    "response_type=token&" +
                    "client_id=ykk5iijr0sarpyk&" +
                    "redirect_uri=" + encodeURIComponent(chrome.identity.getRedirectURL('dropbox'));

                chrome.identity.launchWebAuthFlow({'url': authUrl, 'interactive': true}, function (response) {
                    if (!chrome.runtime.lastError && response.length > 0) {
                        var token = utils.parseQueryString(response.substring(response.indexOf("#") + 1)).access_token;
                        chrome.storage.local.set(wrapObject(DROPBOX_ACCESS_TOKEN, token), loadDropStatus);
                    }
                });
            } else {
                chrome.storage.local.get(DROPBOX_ACCESS_TOKEN, function(items) {
                    var dbx = new Dropbox({accessToken: items[DROPBOX_ACCESS_TOKEN]});
                    dbx.authTokenRevoke();

                    chrome.storage.local.remove(DROPBOX_ACCESS_TOKEN, loadDropStatus);
                });
            }

        });
    }

    loadDropStatus();
    addDropboxClickHandler();

});
