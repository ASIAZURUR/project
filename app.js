const express=require('express');
const app=express();
const dotenv=require('dotenv');
const nodemailer=require('nodemailer');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine','ejs');
app.set('views','./src/views');
app.get('/',function(req,res){
   res.render('home');
  
});
dotenv.config();
const { google } = require("googleapis");
const req = require('express/lib/request');
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
 process.env.OAUTH_CLIENTID  , // ClientID
process.env.OAUTH_CLIENT_SECRET , // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
  refresh_token:process.env.OAUTH_REFRESH_TOKEN 
});
const accessToken = oauth2Client.getAccessToken()
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user:process.env.MAIL_USERNAME,
        pass:process.env.MAIL_PASSWORD,
        clientId:process.env.OAUTH_CLIENTID,
        clientSecret:process.env.OAUTH_CLIENT_SECRET,
        refreshToken:process.env.OAUTH_REFRESH_TOKEN,
        accessToken:accessToken
      }
    });
app.get('/home',function(req,res){
    res.render('index');

})
app.post('/home',function(req,res){
 console.log(req.body.email);
var mailOptions = {
  from:process.env.MAIL_USERNAME,
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
})
app.listen(process.env.PORT ||5000);
