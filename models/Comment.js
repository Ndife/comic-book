var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
   time: Date,
   commentBody: String,
   person: String
});

module.exports = mongoose.model('Comment', SubscriberSchema);