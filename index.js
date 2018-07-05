const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
//const expressValidator = require('express-validator');
const mongoose = require('mongoose');
//const Signature = require('./models/signature.js')

const port = process.env.PORT ||3000;

const app = express();
const url = 'mongodb://Ndife:g0dsw1ll@ds227821.mlab.com:27821/comic-book';


var subscribersRouter = require('./routes/subscribers');
var booksRouter = require('./routes/books.js');
var SubscriberController = require('../controllers/SubscriberController');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;
mongoose.connect(url);

app.use('/books', booksRouter);
// app.post('/subscribers/add', function(req, res, next){
//     SubscriberController.addSubscriber(req, res);
// }
// );

app.get('/', function(req, res){
    res.json({message:"hello world"});
});

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});