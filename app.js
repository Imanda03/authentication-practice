const express = require('express');                 // import the express
const mongoose = require('mongoose');               // import the mongoose
const authRoutes = require('./routes/authRoutes')
// const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');


const app = express();              // call express and startm from here

//middleware
app.use(express.static('public'));      //To use static file like css insdie the public folder
app.use(express.json());
pp.use(cookieParser());

//view engine
app.set('view engine','ejs');

// datebase connection
const dburl = ("mongodb+srv://project:imanda123@cluster0.ogiuh.mongodb.net/node-auth");
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true})
// app.listen(3000);
.then((result) => app.listen(3000))
.catch((error) => console.log(error));

// routes
app.get('/',(req,res) => res.render('home'));
app.get('/',(req,res) => res.render('smoothies'));
app.use('/auth',authRoutes);

//cookies
app.get('./set-cookies',(req,res) => {

    // res.setheader('Set Cookie', 'newUser = true')

    res.cookie('newUser',false);
    res.cookie('isEmployee',true, maxAge: 1000*60*60*24, httpOnly:true);

    res.send('You got the cookies!');
});

app.get('./read-cookies',(req,res){

const cookies = req.cookies;
consolr.log(cookies);

res.json(cookies)
});