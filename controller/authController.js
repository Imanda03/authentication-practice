const User = require('../models/users');
const jwt = require('jsonwebtoken');

//Handle error
const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    //incorrect email
    if (err.message == "incorrect email") {
        errors.email = ' that email is not registered';
    }

    //incorrect password
    if (err.message == "incorrect password") {
        errors.password = ' that password is not registered';
    }

    //duplicate error code
    if (err.code === 11000) {
        errors.email = 'That email already existed'
        return errors;
    }

    //validation error
    if (err.message.includes('user validation failed')) {
        Object.value(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        });
    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'net ninja secret', {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req, res) => {
    res.json({
        name: "anish"
    })
};

module.exports.login_get = (req, res) => {
    res.render('login');
};

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (error) {
        let errors = handleErrors(error);
        res.status(400).json({ errors })
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;


    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.status(200).json({ user: user._id })
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });

    }
};

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}