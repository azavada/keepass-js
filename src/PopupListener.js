function PopupListener() {
    chrome.runtime.onMessage.addListener(function (request, sender, responseCallback) {

        switch(request) {
            case "setMasterPassword":
                break;

            case "getCretendials":
                break;
        }
    });
}