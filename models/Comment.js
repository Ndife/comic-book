var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
   time: Date,
   commentBody: String
});

module.exports = mongoose.model('Comment', SubscriberSchema);