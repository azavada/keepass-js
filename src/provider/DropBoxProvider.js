function DropBoxProvider(token) {
    var dbx = new Dropbox({accessToken: token});

    this.downloadFile = function(path, callback) {
        dbx.filesDownload({path: path})
            .then(function (response) {
                var downloadUrl = URL.createObjectURL(response.fileBlob);
                $.ajax(downloadUrl).done(function (data) {
                    callback(data);
                });
            })
            .catch(function (error) {
                console.error(error);
            });
    }

}