const passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
const User = require('../schemas/userSchema');
const bcrypt = require('bcrypt');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(existingUser => {
            done(null, existingUser);
        })
});

passport.use(new LocalStrategy(
    async function(username, password, done) {
        User.findOne({ user: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false);
            }
            bcrypt.compare(password, user.password, function(err, result) {
                if (result) {
                    return done(null, user)
                } else {
                    return done(null, false);
                }
            });
        });
    }
));
