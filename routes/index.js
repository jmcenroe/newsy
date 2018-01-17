'use strict';

var express = require('express');
var router = express.Router();

var outsiderequest = require('request');

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
                    outsiderequest.post(request.headers.host + '/', request.body);
                })
            }
            else {
                outsiderequest.post(request.headers.host + '/', request.body);
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
        }
    });
});

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
        }
    });
});

module.exports = router;