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
app.get('/home',function(req,res){
    res.render('index');

})
app.post('/home',function(req,res){
 console.log(req.body.email);
res.send("success")})
app.listen(process.env.PORT ||5000);
