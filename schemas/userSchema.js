const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: String,
    password: String,
    firstName: String,
    lastName: String,
    address: {
        street: String,
        city: String,
        state: String,
        zipcode: String
    },
    phoneNumber: String,
    secretQuestion: String,
    secretAnswer: String,
    admin: String
});

module.exports = mongoose.model('users', userSchema);
