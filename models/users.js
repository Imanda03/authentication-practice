const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: 'String',
        required: [true, 'Please enter an email.'],
        unique: true,
        lowerCase: true,
        validate: [isEmail, 'Please enter the validate eemailnp']
    },
    password: {
        type: 'String',
        required: [true, 'Please enter the password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
});

//fire a function after doc saved to db
userSchema.post('save', function (doc, next) {
    console.log('New user is created and saved', doc);

    next();
});

// ..static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password)

        if (auth) {
            return auth;
        }
        throw Error("Incorrect Paassword!");
    }
    throw Error("Incorrect email!")
}

//fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.gensalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;