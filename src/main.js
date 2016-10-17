(function() {

    function loadOptions() {
        chrome.storage.local.get(null, function (items) {
            if (items["provider"] === "dropbox") {
                var provider = new DropBoxProvider(items["dropboxAccessToken"]);
                provider.downloadFile(items["dropboxFileId"], function (data) {
                    // chrome.storage.local.set({dbFile: data});
                    // parseKDBX(data);
                });
            }
        });
    }

    function addMessageListener() {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                switch(request) {
                    case "options-updated":
                        loadOptions();
                        break;
                }
            });
    }

    function parseKDBX(dataAsString) {
        console.log("parsing kdbx....");
        try {
            var credentials = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString('qwerty'), undefined);
            kdbxweb.Kdbx.load(dataAsString, credentials, function(db) {
                console.log(db);
            });
        } catch (e) {
            console.log(e);
        }

    }

    loadOptions();
    addMessageListener();
})();