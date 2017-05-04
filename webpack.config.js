var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.json$/,
      loaders: ['json-loader'],
      use: 'json-loader'
    }]
  },
  node: {
    net: "empty",
    tls: "empty",
    fs: "empty"
  },
  alias: {
    App: 'src/Components/App.jsx',
    VirtCard: 'src/Components/VirtCard.jsx',
    EditVirtDialog: 'src/Components/EditVirtDialog.jsx'
  },
  /*,
  rules: [
    {
      test: /\.json$/,
      use: 'json-loader'
    }
  ]*/
};
