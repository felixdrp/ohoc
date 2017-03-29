var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
// var urlBase = '/ohoc/'
var urlBase = '/'

// var targetUrl = "http://iporalhistory.co.uk"
var targetUrl = "http://localhost:3001"


new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    [urlBase + 'images']: {
      target: targetUrl,
      // pathRewrite: {'^/api' : ''}
    },
    [urlBase + 'api']: {
      target: targetUrl,
      // pathRewrite: {'^/api' : ''}
    },
    [urlBase + 'upload']: {
      target: targetUrl,
      // pathRewrite: {'^/api' : ''}
    },
    [urlBase + 'multimedia']: {
      target: targetUrl,
      // pathRewrite: {'^/api' : ''}
    }
  }
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});
