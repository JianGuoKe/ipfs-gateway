var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({
  target: 'http://localhost:5001/api/v0/',
  changeOrigin: 'http://localhost:5001'
});
proxy.on('proxyReq', function (proxyReq, req, res, options) {
  proxyReq.removeHeader('Access-Control-Allow-Origin');
});
http.createServer(proxy).listen(process.env.PORT || 80);