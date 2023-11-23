var express = require('express');
var app = express();
var fs = require("fs");

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("REST API listening at http://%s:%s", host, port)
});

app.use(express.json());

// GET books
app.get('/', (req, res) => {
    fs.readFile(__dirname + "/" + "books.json", 'utf8', function (err, data) {
        res.end(data);
    });
});

// POST book
app.post('/', function (req, res) {
    // TODO
    res.end();
});

// PUT book
app.put('/', function (req, res) {
    // TODO
    res.end();
});

// DELETE book
app.delete('/', function (req, res) {
    // TODO
    res.end();
});
