if (process.env.NODE_ENV === 'production') {
    //production
    module.exports = require('./prodKeys');
} else {
    //development
    module.exports = require('./devKeys');
}
