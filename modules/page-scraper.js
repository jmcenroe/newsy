'use strict';

const cheerio = require('cheerio');
const request = require('request');

const urlToScrape = 'https://news.ycombinator.com/';

function getArticleData(htmlToScrape) {
    let articles = [];
    
    // Load the scraped HTML into cheerio
    
    // Hacker new uses tr.athing to separate each article
    // Loop through each tr.athing element to capture all of your article data.
    // How would we access the td element containing the article data?

    // Our handlebars template will expect the article data to look like the following:
    // { title: title, link: link }

    return articles;
}

function scrapeData(callback) {
    request(urlToScrape, function (error, request, body) {
        if (error) {
            callback(error);
        } else {
            const articles = getArticleData(body);
            callback(null, articles);
        }
    });
}

module.exports = {
    scrapeData: scrapeData
}

