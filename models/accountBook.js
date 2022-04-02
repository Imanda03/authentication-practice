const mongoose = require('mongoose');

const accountBookSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: [true, 'Please enter an name for your account book.'],
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
        auto: true,
    }
});


const AccountBook = mongoose.model('accountBook', accountBookSchema);

module.exports = AccountBook;