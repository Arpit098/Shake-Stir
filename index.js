const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 9000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/page/:page',function(req,res){
    res.sendFile(__dirname+'/views/'+req.params.page);
})

app.get('/public/:file',function(req,res){
    res.sendFile(__dirname+'/public/'+req.params.file);
})
app.get('/', function(req, res) {
  res.sendFile(__dirname+'/views/index.html');
});
app.get('/home', function(req, res) {
  res.sendFile(__dirname+'/views/index.html');
});
app.get('/services', function(req, res) {
  res.sendFile(__dirname+'/views/Services.html');
});
app.get('/gallery', function(req, res) {
  res.sendFile(__dirname+'/views/Gallery.html');
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP server host
    port: 587, // Replace with the SMTP port (587 for TLS, 465 for SSL)
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'support@shakeandstir.in', // Replace with your SMTP username
      pass: 'zasy toxf wvez pevz', // Replace with your SMTP password
    },
  });
  
  app.post('/submit', (req, res) => {
    const { name, email, phone, message } = req.body;
  
    const mailOptions = {
      from: 'support@shakeandstir.in', // Replace with your SMTP username
      to: 'support@shakeandstir.in', // Replace with the recipient's email address
      subject: 'New Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nPhone Number: ${phone}\nMessage: ${message}`,
    };
    const mailOptions2 = {
      from: 'support@shakeandstir.in', // Replace with your SMTP username
      to: email, // Replace with the recipient's email address
      subject: 'Thank You for Contacting Shake and Stir Hospitality',
      text: `
      Dear Customer,
      
      We hope this message finds you well. Thank you for getting in touch with Shake and Stir Hospitality! Your interest in our beverage catering services means a lot to us.
      
      Our dedicated team is already hard at work reviewing your inquiry, and we'll be reaching out to you shortly to discuss your requirements and answer any questions you may have. We're excited about the opportunity to create a memorable beverage experience for your event.
      
      In the meantime, we invite you to explore our Instagram page (@_shakeandstir) to get a glimpse of our beverage creations, behind-the-scenes moments, and the events we've had the pleasure of being a part of. It's a great way to stay updated with our latest offerings and be inspired by our craft.
      
      Once again, thank you for considering Shake and Stir Hospitality for your beverage catering needs. We're committed to delivering exceptional service and helping you craft the perfect drinks for your special occasion.
      
      If you have any immediate questions or need further assistance, please don't hesitate to contact us at +91-9111143460.
      
      Cheers to a future of delightful beverages and memorable moments!
      
      Warm regards,
      
      Shake and Stir Hospitality Team`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Email could not be sent.');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully to self.');
      }
    });
    transporter.sendMail(mailOptions2, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Email could not be sent.');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully to the user.');
      }
    });
  });



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
