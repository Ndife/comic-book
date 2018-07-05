var express = require('express');

var router = express.Router();
var booksController = require('../controllers/BooksController');
/* GET users listing. */
router.get('/', booksController.getAllBooks);

module.exports = router;