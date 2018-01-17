'use strict';

const cheerio = require('cheerio');
const request = require('request');

const urlToScrape = 'https://www.sandiegoreader.com/news/san-diego-beer-news/';

function getArticleData(htmlToScrape) {
    const $ = cheerio.load(htmlToScrape);
    let articles = [];

    $('.full-item').each(function (index, element) {
        const articleElt = $(element);

        const title = $(articleElt).find('.full-item-title').text();
        const link = 'http://www.esquire.com' + $(articleElt).find('.full-item-title').attr('href');
        const description =$(articleElt).find('.full-item-dek').text();

        articles.push({
            title: title,
            description: description,
            link: link
        });
    });

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