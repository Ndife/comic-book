var model = require('../models/Subscriber');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'djangelopoku@gmail.com',
        pass: 'djangelonthebeats'
    }
  });
exports.addSubscriber = function(req, res){
    var data = {
        email: req.body.email,
        preferences: []
    };
    model.create(data, function(err, user){
        if (err) res.json({error:err});
        model.findById(user._id, function(err, result){
            for (choice of req.body.preferences){
                result.preferences.push(choice);
            }
            result.save();
            if (err) res.json({err:err, message:'error occured while creating user'});
            res.json({message:'Subscriber added successfully.'});
        });
    });
}

exports.deleteSubscriber = function(req, res){
    var email = req.params.email;
    model.remove({email:email}, function(err){
        if (err) res.json({err:err, message:'could not delete subscriber'});
        return res.json('user unsubscribed');
    });
}

exports.sendNotification = function(req, res){
    model.find({}, '-_id -preferences -__v', function(err, users){
        if (err) res.json({err:err, message:'error while retrieving users'})
        for (recipient of users){
            var mailOptions = {
                from: '"Privvy at Comic-Gallery"',
                to: recipient,
                subject: 'New Comic Updates',
                html: '<h1>Hi there,</h1> <p>Hello from ComicGallery</p> <h1><i>TeamBoondocks</i></h1>'+
                `<a href=\'http://comic-gallery/unsubscribe/${recipient['email']}\'>Unsubscribe</a>`
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        }
    });
    return res.json('notification sent');
}