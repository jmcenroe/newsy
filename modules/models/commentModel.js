'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
<<<<<<< HEAD
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
=======
    name: String,
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
>>>>>>> 1299211c45d62aec281e25a3917751e8c6b3c5c0
    },
    comment: String
});

const Comment = mongoose.model('Comment', CommentSchema);
<<<<<<< HEAD
module.exports = Comment;
=======
module.exports = Comment;
>>>>>>> 1299211c45d62aec281e25a3917751e8c6b3c5c0
