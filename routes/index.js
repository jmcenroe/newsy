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
        }
    });
});

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
        }
    });
});


var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log("App listening on ", port);
});