const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api/v1',
        createProxyMiddleware({
            target: 'http://localhost:8888/',
            changeOrigin: true,
            pathRewrite: {
                '^api/v1': ''
            }
        }),
    );
}