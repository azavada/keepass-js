function PasswordManager(kdbxFile, masterPassword) {
    var credentials = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString(masterPassword), undefined);

    this.getLoginInfoForUrl = function(url) {
        kdbxweb.Kdbx.load(kdbxFile, credentials, function(db) {
            // console.log(db);
            var fields = db.groups[0].entries[0].fields;

            // console.log(fields);
            var bytes = fields.Password._value;
            var salt = fields.Password._salt;
            var password = new kdbxweb.ProtectedValue(bytes, salt);
            console.log(password.getText());
        });
    };

    this.getUrlList = function() {

    }
}