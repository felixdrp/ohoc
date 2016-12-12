var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      // pathRewrite: {'^/api' : ''}
    },
    '/upload': {
      target: 'http://localhost:3001',
      // pathRewrite: {'^/api' : ''}
    },
    '/multimedia': {
      target: 'http://localhost:3001',
      // pathRewrite: {'^/api' : ''}
    }
  }
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});
