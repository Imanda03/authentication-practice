const express = require('express');                 // import the express
const mongoose = require('mongoose');               // import the mongoose
const authRoutes = require('./routes/authRoutes')
// const expressLayouts = require('express-ejs-layouts');


const app = express();              // call express and startm from here

//middleware
app.use(express.static('public'));      //To use static file like css insdie the public folder

//view engine
app.use(express.json());
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