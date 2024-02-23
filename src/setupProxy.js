const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/ms-movie-store-search',
        createProxyMiddleware({
            target: 'https://back-end-cloud-gateway-filters-production.up.railway.app',
            changeOrigin: true,
        })
    );
};
