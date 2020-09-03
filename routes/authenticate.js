const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../schemas/userSchema');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (app) => {
    app.get('/logout', function(req, res){
        req.logout();
        res.send('Successfully logged out');
    });

    app.post('/signup/newuser', (req, res) => {
        User.findOne({user: req.body.username}, function (err, user) {
            if (err) {
                res.send('Something went wrong, please try again');
            }
            if (user) {
                return res.send('user exists');
            }
            if (!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName) {
                return res.send('all fields required');
            }
            if (!user) {
                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    const newUser = new User({
                        user: req.body.username,
                        password: hash,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        address: {
                            street: req.body.street,
                            city: req.body.city,
                            state: req.body.state,
                            zipcode: req.body.zipcode
                        },
                        phoneNumber: req.body.phoneNumber
                    });
                    newUser.save();
                    res.send('Success!');
                });
            }
        })
    });



    app.post('/login/authorize', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/loginIncorrect'
    }));

    app.get('/userinfo', (req, res) => {
        if (!req.user) {
            return null
        } else {
            res.send({
                id: req.user.id,
                email: req.user.user,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                phoneNumber: req.user.phoneNumber,
                address: req.user.address
            });
        }
    });
}
