const User = require('../models/users')

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
        res.status(201).json(user);
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