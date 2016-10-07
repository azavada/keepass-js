$(function () {
    const DROPBOX_ACCESS_TOKEN = "dropboxAccessToken";

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
        var dropBoxAuth = new DropBoxAuth();

        $("#dropbox").click(function () {
            var $this = $(this);
            if ($this.val() === "Use Dropbox") {
                dropBoxAuth.login(function (token) {
                    chrome.storage.local.set(wrapObject(DROPBOX_ACCESS_TOKEN, token), loadDropStatus);
                    chrome.storage.local.set({"provider": "dropbox"});
                });

            } else {
                chrome.storage.local.get(DROPBOX_ACCESS_TOKEN, function (items) {
                    dropBoxAuth.logout(items[DROPBOX_ACCESS_TOKEN]);

                    chrome.storage.local.remove(DROPBOX_ACCESS_TOKEN, loadDropStatus);
                    chrome.storage.local.remove("provider");
                });
            }

        });
    }

    loadDropStatus();
    addDropboxClickHandler();

});
