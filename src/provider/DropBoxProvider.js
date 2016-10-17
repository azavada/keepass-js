function DropBoxProvider(token) {
    var dbx = new Dropbox({accessToken: token});

    this.downloadFile = function(path, callback) {
        dbx.filesDownload({path: path})
            .then(function (response) {
                var downloadUrl = URL.createObjectURL(response.fileBlob);

                download(downloadUrl, callback);
                // $.ajax(downloadUrl).done(function (data) {
                //     callback(data);
                // });
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    function download(url, callback) {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", url, true);
        oReq.responseType = "arraybuffer";

        oReq.onload = function (oEvent) {
            var arrayBuffer = oReq.response;
            callback(arrayBuffer);
        };

        oReq.send();
    }
}