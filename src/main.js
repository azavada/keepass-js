(function() {

    function loadOptions() {
        chrome.storage.local.get(null, function (items) {
            if (items["provider"] === "dropbox") {
                var provider = new DropBoxProvider(items["dropboxAccessToken"]);
                provider.downloadFile(items["dropboxFileId"], function (data) {
                    chrome.storage.local.set({dbFile: data});
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


    loadOptions();
    addMessageListener();
})();