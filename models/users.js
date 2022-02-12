const mongoose = require('mongoose');
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    email:{
        type : 'String',
        required : [true,'Please enter an email.'],
        unique : true,
        lowerCase : true,
        validate : [isEmail, 'Please enter the validate eemailnp']
    },
    password: {
        type: 'String',
        required : [true,'Please enter the password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
});

//fire a function after doc saved to db
userSchema.post('save',function (doc, next){
    console.log('New user is created and saved', doc);

    next();
});

//fire a function before doc saved to db


const User = mongoose.model('user',userSchema);

module.exports = User;