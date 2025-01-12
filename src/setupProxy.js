const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://139.99.170.83:8070',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove `/api` prefix so `/api/register/` becomes `/register/`
      },
    })
  );
};