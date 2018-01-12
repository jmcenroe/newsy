'use strict';

const mongojs = require('mongojs');

const databaseUrl = 'scraper';
const collections = ['scrapedData'];

module.exports = mongojs.apply(databaseUrl, collections);