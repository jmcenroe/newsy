<<<<<<< HEAD
'use strict';

var express = require('express');
var router = express.Router();

var otherRequest = require('request');

const scrapedDataBuilder = require('../modules/scraped-data-builder');
const db = require('../modules/db-setup');

router.get('/', function (request, response) {
   
    db.Article.find(function (error, articles) {
        if (error) {
            response.status(500).end();
        } else {
            response.render('allarticles', {
                articles: articles
            });
        }
    });
});

router.post('/', function (request, response) {

    db.Article.find(function (error, articles) {
        if (error) {
            response.status(500).end();
        } else {
            response.render('allarticles', {
                articles: articles,
                user: request.body
            });
        }
    });
});

router.post('/user', function (request, response) {
    db.User.findOne(request.body,function(error, data) {
        if(error) {
            console.log(error)
        }
        else {
            if (data === null) {
                db.User.create(request.body,function(error,data) {
                    otherRequest.post(request.headers.host + '/', request.body);
                })
            }
            else {
                otherRequest.post(request.headers.host + '/', request.body);
            }
        }

    })

    
})

router.get('/article/:id', function (request, response) {
    const articleId = request.params.id;

    db.Article.findById(articleId)
    .populate('comments')
    .exec(function (error, articleData) {
        if (error) {
            response.status(500).end();
        } else {
            response.render('article', {
                article: articleData
            });
=======
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request'); 
const cheerio = require('cheerio');
const express = require('express');
const app = express();

const Article = require("./models/Article.js");
const Comment = require("./models/Comment.js");

app.use(bodyParser.urlencoded({
  extended: false
}));

//Use public directory
app.use(express.static('public'));

//Mongoose - Configure and connect to the database 
mongoose.connect('mongodb://heroku_vqrgk76p:5tteg11i3g79rrih5rm51dkb7@ds255347.mlab.com:55347/heroku_vqrgk76p');
const db = mongoose.connection;

//Mongoose - show errors
db.on("error", function(error){
    console.log("Mongoose error: ", error);
});

//Mongoose - success message upon database connection
db.once("open", function(){
    console.log("Mongoose connection successful")
});


//======Routes=======

//Home route
app.get('/', function(request, response) {
  res.send(index.html);
});

//Scrape route
app.get("/scrape", function(req, res){
    console.log("***scrape***");
    var url = "https://www.sandiegoreader.com/news/san-diego-beer-news/";
    request(url, function (error, response, html) {
        if(error){
            throw error;
        }

        //Load the scraped site's html into cheerio
        var $ = cheerio.load(html);

        //loop through each scraped article
        $("h2.post-title").children().each(function (i, element){
            var title = $(element).text().trim();
            var link = $(element).attr("href");

            var result = {
                title: title,
                link: link
            };

                Article.find({link: result.link}, function(error, articleArr){
                //If the current article is already in the database
                if(articleArr.length){
                    console.log("Article skipped: ", articleArr)
                }//Otherwise, store it to the DB
                else{
                    var scrapedArticle = new Article(result);
                    scrapedArticle.save(function(error, doc){
                        if (error){
                            console.log("error: ", error);
                        }else{
                            console.log("new article scraped:", doc);
                        }
                    });
                }
            })
        });
    });
})

//Retrieve all articles from the DB
app.get("/articles", function(request, response){
    Article.find({}, function(error, doc){
        if(error){
            console.log(error);
        }else{
            response.json(doc);
>>>>>>> 1299211c45d62aec281e25a3917751e8c6b3c5c0
        }
    });
});

<<<<<<< HEAD
router.post('/addComment/:id', function (request, response) {
    const articleId = request.params.id;
    
    db.Article.findById(articleId,
        function (error, document) {
            const comment = new db.Comment({
                name: request.body.name,
                email: request.body.email,
                comment: request.body.comment
            });

            document.comments.push(comment);
            document.save(function () {
                response.redirect(`/article/${articleId}`);
            });
        });
});

router.post('/addUser', function (request,response){

    console.log('Request', request.body);
    db.User.create(request.body, function(error) {

        if(error) {
            console.log(error)
        }
        else {
            response.send('Completed request');
        }

    });

});

router.get('/scrape', function (request, response) {
    scrapedDataBuilder.scrapeAndSaveArticleData(function (error) {
        if (error) {
            response.status(500).end();
        } else {
            response.redirect('/');
=======
//Retrieve a specific article by id
app.get("/articles/:id", function(request, response){
    //Find the specific article in the DB
    Article.findOne({"_id": request.params.id})
    //Populate thehat article's comments
    .populate("comment")
    //Run the query
    .exec(function(error, doc){
        if(error){
            console.log(error);
        }else{
            response.json(doc);
        }
    });
});

//Add and replace comments
app.post("/articles/:id", function(request, response){
    //Make a new Comment from the user's input
    var newComment = new Comment(request.body);

    newComment.save(function(error, doc){
        if (error){
            console.log(error);
        } else{
            //Add new comment/replace old comment with new comment
            Article.findOneAndUpdate({"_id": request.params.id}, {"comment": doc._id})
            .exec(function(error, doc){
                if(error){
                    console.log(error);
                } else{
                    response.send(doc);
                }
            })
>>>>>>> 1299211c45d62aec281e25a3917751e8c6b3c5c0
        }
    });
});

<<<<<<< HEAD
module.exports = router;
=======

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log("App listening on ", port);
});
>>>>>>> 1299211c45d62aec281e25a3917751e8c6b3c5c0
