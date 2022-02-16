const User = require('../models/users');
const jwt = require('jaonwebtoken');

//Handle error
const handleErrors = (err) => {
    console.log(err.meassage, err.code);
    let errors = { email: '', password: '' };

    //duplicate error code
    if (err.code === 11000) {
        errors.email = 'That email already existed'
        return errors;
    }

    //validation error
    if (err.meassage.includes('user validation failed')) {
        Object.value(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        });
    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'net ninja secret', {
        expireIn: maxAge
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
        let errors = handleErrors();
        res.status(400).json({ errors })
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    res.send('user login');
};