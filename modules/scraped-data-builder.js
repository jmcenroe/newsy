<<<<<<< HEAD
const mongoHelper = require('./mongo-helper');
const pageScraper = require('./page-scraper');

function insertArticles(data, callback) {
    return mongoHelper.insertRecords(data, function (error) {
        if (error) {
            callback(error);
        } else {
            callback(null);
        }
    });
}

function scrapeAndSaveArticleData(callback) {
    return pageScraper.scrapeData(function (error, data) {
        if (error) {
            callback(error);
        } else {
            insertArticles(data, callback);
        }
    });
}

module.exports = {
    scrapeAndSaveArticleData: scrapeAndSaveArticleData
}

=======
const mongoHelper = require('./mongo-helper');
const pageScraper = require('./page-scraper');

function insertArticles(data, callback) {
    return mongoHelper.insertRecords(data, function (error) {
        if (error) {
            callback(error);
        } else {
            callback(null);
        }
    });
}

function scrapeAndSaveArticleData(callback) {
    return pageScraper.scrapeData(function (error, data) {
        if (error) {
            callback(error);
        } else {
            insertArticles(data, callback);
        }
    });
}

module.exports = {
    scrapeAndSaveArticleData: scrapeAndSaveArticleData
}

>>>>>>> 1299211c45d62aec281e25a3917751e8c6b3c5c0
