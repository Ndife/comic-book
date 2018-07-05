var model = require('../models/Book');
//var service = require('../services/UserService');
//const Joi = require('joi');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.getBookByid = function(req, res){
    var id = res.params.id;
    model.findById(id, function(err, book){
        if (err) res.json({err:err, message:'sorry, could not get book by id'});
        res.json({message:book});
    });
}
exports.getAllBooks = function(req, res){
    model.find({}, '-__v', function(err, books){
        if (err) res.json({err:err, message:'sorry, could not return all books'});
        res.json({message:'books'})
    });
}