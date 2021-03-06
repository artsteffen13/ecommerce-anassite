const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/signup/newuser', { target: 'http://localhost:5000', changeOrigin: true }));
    app.use(proxy('/userinfo', { target: 'http://localhost:5000', changeOrigin: true }));
    app.use(proxy('/login/authorize', { target: 'http://localhost:5000', changeOrigin: true }));
    app.use(proxy('/logout', { target: 'http://localhost:5000', changeOrigin: true }));
    app.use(proxy('/account/editaccount', { target: 'http://localhost:5000', changeOrigin: true }));
    app.use(proxy('/editproducts/newproduct', { target: 'http://localhost:5000', changeOrigin: true }));
    app.use(proxy('/products/getproducts', { target: 'http://localhost:5000', changeOrigin: true }));
};
