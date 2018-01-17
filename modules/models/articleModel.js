'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: String,
    link: String,
<<<<<<< HEAD
    description: String,
=======
>>>>>>> 1299211c45d62aec281e25a3917751e8c6b3c5c0
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;