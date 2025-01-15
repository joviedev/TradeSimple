const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  
  app.use(
    '/api1',
    createProxyMiddleware({
      target: 'http://139.99.170.83:8070',
      changeOrigin: true,
      pathRewrite: {
        '^/api1': '', // Remove `/api` prefix so `/api/register/` becomes `/register/`
      },
    })
  );

app.use(
  '/api2',
  createProxyMiddleware({
    target: 'http://139.99.170.83:8000',
    changeOrigin: true,
    pathRewrite: {
      '^/api2': '', // Remove `/predict` prefix
    },
  })
);
};