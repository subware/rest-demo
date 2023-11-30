var express = require('express');
var app = express();
var fs = require("fs");

bodyParser = require("body-parser"),
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Book API",
        version: "0.1.0",
        description:
          "This is a book API",
      },
      servers: [
        {
          url: "http://localhost:8081",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("REST API listening at http://%s:%s", host, port)
});

app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );

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
