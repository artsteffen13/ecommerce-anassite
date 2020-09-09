const express = require('express')
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const sslRedirect = require('heroku-ssl-redirect');
const keys = require('./keys/keys');

require('./passport/localStrategy');

const app = express();

const sess = {
    secret: keys.secret,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

app.use(sslRedirect());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/home', (req, res) => {
    res.send('Hello')
});

mongoose.connect(keys.mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

require('./routes/authenticate')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('clientside/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'clientside', 'build', 'index.html'))
    });
}

let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}
app.listen(port);
