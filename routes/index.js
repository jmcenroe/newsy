'use strict';

var express = require('express');
var router = express.Router();

const scrapedDataBuilder = require('../modules/scraped-data-builder');
const db = require('../modules/db-setup');
const mongojs = require('mongojs');

router.get('/', function (request, response) {
    db.scrapedData.find(function (error, articles) {
        if (error) {
            response.status(500).end();
        } else {
            response.render('allarticles', {
                articles: articles
            });
        }
    });
});

router.get('/article/:id', function (request, response) {
    const articleId = request.params.id;

    db.scrapedData.find({ _id: mongojs.ObjectId(articleId) }, function (error, articleData) {
        if (error) {
            response.status(500).end();
        } else {
            const article = articleData[0];

            response.render('article', {
                article: article
            });
        }
    });
});

router.post('/addComment/:id', function (request, response) {
    const articleId = request.params.id;

    db.scrapedData.update(
        { _id: mongojs.ObjectId(articleId) },
        {
            $push: {
                comments: {
                    name: request.body.name,
                    email: request.body.email,
                    comment: request.body.comment
                }
            }
        },
        function () {
            response.redirect(`/article/${articleId}`);
        });
});

router.get('/scrape', function (request, response) {
    scrapedDataBuilder.scrapeAndSaveArticleData(function (error) {
        if (error) {
            response.status(500).end();
        } else {
            response.status(201).send('Record(s) created').end();
        }
    });
});

module.exports = router;
