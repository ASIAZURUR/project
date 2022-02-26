const express=require('express');
const app=express();

const nodemailer=require('nodemailer');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine','ejs');
app.set('views','./src/views');
app.get('/',function(req,res){
    res.send("Welcome to Coding Competition #2 by ASIA ZURUR.K ,  FSD KKEM OCT")
  
});

const { google } = require("googleapis");
const req = require('express/lib/request');
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
'912757938079-rtpi9km0vqlna0o4t3n4omgpaf3mvi6s.apps.googleusercontent.com'  , // ClientID
'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' , // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
  refresh_token:'1//04BxrBV5EaUM4CgYIARAAGAQSNwF-L9IrXargcdTJdDiuurBf5bX2nUpJ_mTADe2nB2OR3zBZMrfJzrpTZV7KAHWYgEnLBWBRKgU' ;
});
const accessToken = oauth2Client.getAccessToken()
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user:"asiyasuroor@gmail.com",
        pass:"9526852962",
        clientId:'912757938079-rtpi9km0vqlna0o4t3n4omgpaf3mvi6s.apps.googleusercontent.com',
        clientSecret:'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',
        refreshToken:'1//04BxrBV5EaUM4CgYIARAAGAQSNwF-L9IrXargcdTJdDiuurBf5bX2nUpJ_mTADe2nB2OR3zBZMrfJzrpTZV7KAHWYgEnLBWBRKgU',
        accessToken:accessToken
      }
    });
app.get('/home',function(req,res){
    res.render('index');

})
app.post('/home',function(req,res){
 console.log(req.body.email);
var mailOptions = {
  from:'asiyasuroor@gmail.com',
  to: req.body.email,
  subject: 'Sending Email using Node.js',
  text: 'Your email is verified!'
};
transporter.sendMail(mailOptions, function(err, data) {
  if (err) {
    console.log("Error " + err);
    res.send("Something went wrong")
  } else {
    console.log("Email sent successfully");
    res.send("Email sent successfully")
  }})
app.listen(process.env.PORT ||5000);
