module.exports.register_get = (req,res)=>{
    res.render('register');
};

module.exports.logIn_get = (req,res)=>{
    res.render('logIn');
};

module.exports.register_post = (req,res)=>{
    res.send('New SignUp');
};

module.exports.logIn_post = (req,res)=>{
    res.send('User Login');
};