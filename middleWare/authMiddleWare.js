const jwt = require('jsonwebtoken');
const User = require('../models/users');

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt

    //check json web  token exists and is verified
    if (token) {
        jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                // res.redirect('/login');
                res.status(401).json('unauthorzed')
            } else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        res.status(401).json('unauthorzed');
    }
}

//check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };