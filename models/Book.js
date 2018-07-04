var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
   title: String,
   bookBody: String,
   views: Number,
   time: Date,
   category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
   comments:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('Book', BookSchema);