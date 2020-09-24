const Product = require('../schemas/productSchema');
const keys = require('../keys/keys');
const _ = require('lodash');

module.exports = (app) => {
    app.post('/editproducts/newproduct', (req, res) => {
        if (req.user.admin === keys.adminSecret) {
            const newProduct = new Product({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                picture: req.body.picture
            });
            newProduct.save();
            res.send('success');
        } else {
            res.send('Unauthorized');
        }
    });

    app.get('/products/getproducts', (req, res) => {
        Product.find({}, function (err, result) {
            if (err) {
                res.send(err)
            } else {
                res.send(result)
            }
        })
    })
};
