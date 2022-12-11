var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();
var port = process.env.PORT || 80;
proxy.on('proxyReq', function (proxyReq, req, res, options) {

  proxyReq.setHeader('host', '127.0.0.1:5001')
  proxyReq.setHeader('origin', 'http://127.0.0.1:5001')
  proxyReq.setHeader('referer', 'http://127.0.0.1:5001/')
  // console.log(proxyReq.getHeaders())
});

proxy.on('proxyRes', function (proxyRes, req, res, options) {
  proxyRes.headers['access-control-allow-origin'] = '*';
  proxyRes.headers['Transfer-Encoding'] = 'chunked';
});

proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('error');
});
http.createServer(function (req, res) {
  proxy.web(req, res, {
    target: 'http://localhost:5001/api/v0/'
  });
}).listen(port);

console.log('start at', port)