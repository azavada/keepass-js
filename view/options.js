$(function () {
    const DROPBOX_ACCESS_TOKEN = "dropboxAccessToken";
    const DROPBOX_FILE_PATH = "dropboxFilePath";
    const DROPBOX_FILE_ID = "dropboxFileId";

    function loadDropStatus() {
        chrome.storage.local.get(null, function (items) {

            if (items.hasOwnProperty(DROPBOX_ACCESS_TOKEN)) {
                $("#dropbox").val("Logout Dropbox");
                showDropboxContent(items[DROPBOX_ACCESS_TOKEN]);
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

    function showDropboxContent(token) {
        var dbx = new Dropbox({accessToken: token});

        $('#jstree_div').jstree({
            "core": {
                "animation": 0,
                "check_callback": true,
                "themes": {"stripes": true},
                "multiple": false,

                "data": function (obj, callback) {
                    dbx.filesListFolder({path: obj.id === "#" ? "" : obj.data})
                        .then(function (response) {
                            // console.log(response);
                            var array = [];

                            response.entries.forEach(function (entry) {
                                var isFolder = entry[".tag"] === "folder";

                                array.push({
                                    id: entry.id,
                                    data: entry.path_display,
                                    text: entry.name,
                                    children: isFolder,
                                    state: {
                                        opened: false,
                                        selected: false
                                    },

                                    icon: isFolder ? "jstree-folder" : "jstree-file"
                                });

                            });

                            callback(array);
                        });
                }
            },
            "plugins": [
                "wholerow", "ui"
            ]
        });

        $('#jstree_div').on("changed.jstree", function (e, data) {
            if (data.action === "select_node") {
                if (data.instance.is_leaf(data.node)) {

                    chrome.storage.local.set(wrapObject(DROPBOX_FILE_ID, data.node.id));
                    chrome.storage.local.set(wrapObject(DROPBOX_FILE_PATH, data.node.data));
                    $("#selected_file").text(data.node.data);
                } else {
                    chrome.storage.local.remove(DROPBOX_FILE_ID);
                    chrome.storage.local.remove(DROPBOX_FILE_PATH);
                    $("#selected_file").text("");
                }

                chrome.runtime.sendMessage("options-updated");
            }
        });
    }

    loadDropStatus();
    addDropboxClickHandler();
});
