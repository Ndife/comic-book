var mongoose = require('mongoose');

var SubcriberSchema = mongoose.Schema({
   email:  { type: String, unique: true},
   preferences:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}]
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);