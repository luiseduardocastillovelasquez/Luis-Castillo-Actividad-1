const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/ms-movie-store-search',
        createProxyMiddleware({
            target: 'http://localhost:8762',
            changeOrigin: true,
        })
    );
};
