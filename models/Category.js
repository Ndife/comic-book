var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
   title: String
});

module.exports = mongoose.model('Category', CategorySchema);