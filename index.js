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
    console.log("test:" + req.body);
    // TODO
    fs.readFile(__dirname + "/" + "books.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data.push(req.body);
        console.log(req.body);
        fs.writeFile(__dirname + "/" + "books.json", JSON.stringify(data, null, 2), () => {});
        res.end(JSON.stringify(data));
    });
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
