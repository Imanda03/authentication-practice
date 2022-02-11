const express = require('express');                 // import the express
const mongoose = require('mongoose');               // import the mongoose
const authRoutes = require('./routes/authRoutes')

const app = express();              // call express and startm from here

//middleware
app.use(express.static('public'));      //To use static file like css insdie the public folder

//view engine
// app.set('view engine');

// datebase connection
const dburl = ("mongodb://localhost/eSchool");
mongoose.connect(dburl)
app.listen(3000);
// .then((resukt) => app.listen(3000))
// .catch((error) => console.log(error));

// routes
app.get('/',(req,res) => res.render('login'));
app.get('/',(req,res) => res.render('register'));
app.use('/auth',authRoutes);