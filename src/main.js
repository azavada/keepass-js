(function() {

    function loadOptions() {
        chrome.storage.local.get(null, function (items) {
            if (items["provider"] === "dropbox") {
                var provider = new DropBoxProvider(items["dropboxAccessToken"]);
                provider.downloadFile(items["dropboxFileId"], function (data) {
                    parseKDBX(data);
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
                var fields = db.groups[0].entries[0].fields;

                console.log(fields);
                var bytes = fields.Password._value;
                var salt = fields.Password._salt;
                var password = new kdbxweb.ProtectedValue(bytes, salt);
                console.log(password.getText());
            });
        } catch (e) {
            console.log(e);
        }
    }

    loadOptions();
    addMessageListener();

    chrome.pageAction.onClicked.addListener(function (tab) {
       console.log(tab);
    });

    var rule1 = {
        conditions: [
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { schemes: ['https', "http"] }
            })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
    };

    // chrome.runtime.onInstalled.addListener(function(details)
    // {
        chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
            chrome.declarativeContent.onPageChanged.addRules([rule1]);
        });
    // });

    chrome.runtime.onMessage.addListener(function(request, sender, responseCallback) {
        if (typeof request.log !== "undefined") {
            console.log(request.log);
        }
    });
})();