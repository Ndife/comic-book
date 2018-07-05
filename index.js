const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
//const expressValidator = require('express-validator');
const mongoose = require('mongoose');
//const Signature = require('./models/signature.js')
const app = express();
const url = 'mongodb://localhost:27017/comic-gallery';


var subscribersRouter = require('./routes/subscribers');
var booksRouter = require('./routes/books.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;
mongoose.connect(url);

app.use('/books', booksRouter);
app.use('/subscribers', subscribersRouter);

app.listen(process.env.PORT || 3000);
console.log('starting applicaiton.  Good job!');