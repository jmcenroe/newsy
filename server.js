// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");

var request = require("request");

mongoose.Promise = global.Promise;

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + "/public"));

var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

mongoose.connect('mongodb://localhost/product')
  .then(() =>  console.log('mongoose connection succesful'))
  .catch((err) => console.error(err));

// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});