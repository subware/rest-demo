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
    fs.readFile(__dirname + "/" + "books.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data.push(req.body);
        fs.writeFile(__dirname + "/" + "books.json", JSON.stringify(data, null, 2), () => { });
        res.end(JSON.stringify(data));
    });
});

// PUT book
app.put('/', function (req, res) {
    fs.readFile(__dirname + "/" + "books.json", 'utf8', function (err, data) {
        data = JSON.parse(data);        
        console.log(data);
        var book = data.find(b => b.id == req.body.id);
        console.log(book);
        book.name = req.body.name;        
        fs.writeFile(__dirname + "/" + "books.json", JSON.stringify(data, null, 2), () => { });
        res.end(JSON.stringify(data));
    });
});

// DELETE book
app.delete('/', function (req, res) {
    fs.readFile(__dirname + "/" + "books.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data = data.filter((b) => Number(b.id) !== Number(req.query.id));
        fs.writeFile(__dirname + "/" + "books.json", JSON.stringify(data, null, 2), () => { });
        res.end();
    });
});
