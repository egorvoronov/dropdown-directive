var express = require('express');

var app = express();


var appHelpers = {};
appHelpers.sendFile = function(pathname, res) {
    res.sendFile(pathname, {
        root: __dirname
    });
};

//send anything with a file extension as normal
app.get('*.*', function(req, res) {
    appHelpers.sendFile('.' + req.url, res);
});

//intercept any pathes and send "./index.html":
app.get('*', function(req, res) {
    appHelpers.sendFile('./index.html', res);
});

module.exports = app;