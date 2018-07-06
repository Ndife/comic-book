var model = require('../models/Subscriber');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'djangelopoku@gmail.com',
        pass: 'djangelonthebeats'
    }
  });
  function subscriberAdded(email){
    var mailOptions = {
        from: '"Privvy at Comic-Gallery"',
        to: email,
        subject: `<div align="center">
        <div style="width:70%;">
        <div style="height:80px; border-radius:10px; font-size:150%; margin-top:10px; color:white; background-color:#007470"><div style="padding-top:18px;">Boondocks Comic Gallery</div></div>
        <div align="center" style="font-size:110%; color:black;"><p>You will be recieving regular updates from your favorite comics.</p>
        <p>Remember to Stay Cool and Warm...</p>
        <small style="color:grey;">If you didn't subscribe to Boondocks for this notification,  you can unsubscribe via this link <a style="text-decoration:none;" href=\'https://comic-buk.herokuapp.com/subscribers/unsubscribe/${email}\'>Unsubscribe</a></small><br/>
        
        </div>
        </div>
        </div>`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return false;
        } else {
          console.log('Email sent: ' + info.response);
          return true;
        }
      });
}

exports.addSubscriber = function(req, res){
    var data = {
        email: req.body.email,
        preferences: req.body.preferences
    };

    var subscriber = new model(data);
    subscriber.save(function(err){
        if(!err && subscriberAdded(subscriber.email)){
            res.json({message: 'the thing work oh!'});
        } else{
            res.json(err);
        }
        
    });
}

exports.deleteSubscriber = function(req, res){
    var email = req.params.email;
    model.remove({email:email}, function(err){
        if (err) res.json({err:err, message:'could not delete subscriber'});
        return res.json('user unsubscribed');
    });
}

exports.sendNotification = function(req, res, category, bookTitle, BookBody){

    model.find({}, '-_id -__v', function(err, users){
        if (err) res.json({err:err, message:'error while retrieving users'})
        for (recipient of users){
            if(recipient.preferences.includes(category)){
                var mailOptions = {
                    from: '"Privvy at Comic-Gallery"',
                    to: recipient,
                    subject: 'New Comic Update',
                    html: `<h1>Hello, ${bookTitle} has been added to your favorite collection</h1><p>${BookBody}</P><h3><i>Greetings from TeamBoondocks</i></h3>`+
                    `<p>If you don\'t want to see this notification again, you can <a href=\'https://comic-buk.herokuapp.com/subscribers/unsubscribe/${recipient['email']}\'>Unsubscribe</a></p>`
                  };
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
            }else{
                //do nothing
            }     
        }
    });
    return res.json('notification sent');
}