const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    picture: String
})

module.exports = mongoose.model('product', productSchema);
