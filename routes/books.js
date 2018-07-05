var express = require('express');
const multer = require('multer');

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
   console.log(req.file);
    res.status(200).json({message:'success'});
    
  });
module.exports = router;