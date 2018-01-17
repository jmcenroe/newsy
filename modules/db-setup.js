<<<<<<< HEAD
'use strict';

const db = require('./models');

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/newsscrape", {});

db.mongoose = mongoose;

=======
'use strict';

const db = require('./models');

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/scraper", {});

db.mongoose = mongoose;

>>>>>>> 1299211c45d62aec281e25a3917751e8c6b3c5c0
module.exports = db;