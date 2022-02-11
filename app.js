const express = require('express');                 // import the express
const mongoose = require('mongoose');               // import the mongoose
const authRoutes = require('./routes/authRoutes')

const app = express();              // call express and startm from here

//middleware
app.use(express.static('public'));      //To use static file like css insdie the public folder

//view engine
app.set('view engine', 'html');

// datebase connection
const dburl = 'mongodb+srv://project:imanda123@cluster0.ogiuh.mongodb.net/node-auth';
mongoose.connect(dburl,{usenewParser: true, useUnfiedTopology: true,useCreateIndex: true})
.then((resukt) => app.listen(3000))
.catch((error) => console.log(error));

// routes
app.get('/',(req,res) => res.render('login'));
app.get('/',(req,res) => res.render('register'));
app.use(authRoutes);