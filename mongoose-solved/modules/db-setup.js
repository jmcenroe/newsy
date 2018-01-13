'use strict';

const db = require('./models');

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/scraper", {});

db.mongoose = mongoose;

module.exports = db;