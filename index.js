const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

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
      user: 'arpit298agrawal@gmail.com', // Replace with your SMTP username
      pass: 'fcby xmqx rmkx ubiz', // Replace with your SMTP password
    },
  });
  
  app.post('/submit', (req, res) => {
    const { name, email, phone, message } = req.body;
  
    const mailOptions = {
      from: 'arpit298agrawal@gmail.com', // Replace with your SMTP username
      to: email, // Replace with the recipient's email address
      subject: 'New Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nPhone Number: ${phone}\nMessage: ${message}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Email could not be sent.');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully.');
      }
    });
  });



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
