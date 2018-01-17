'use strict';

const db = require('./models');

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/newsscrape", {});

db.mongoose = mongoose;

module.exports = db;