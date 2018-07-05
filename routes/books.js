var express = require('express');
const multer = require('multer');
var model = require('../models/Book');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

var router = express.Router();
var booksController = require('../controllers/BooksController');
/* GET users listing. */
router.get('/', booksController.getAllBooks);

router.post('/addBook',upload.single('image'), function (req, res, next) {
    var data = {
   title: req.body.title,
   bookBody: req.body.bookBody,
   views: 0,
   time: Date.now(),
   image: req.file.filename,
   category: req.body.category,
   comments:  []
}
model.create(data,(err)=>{
    if(err) res.json({err:err, message:'Failed to add book'});
    res.json({message:'book added successfuly'});
});
    });

module.exports = router;