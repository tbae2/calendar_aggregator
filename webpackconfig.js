var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugion({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    filename: 'index_bundle.js',
    path: __dirname + '/dist'
  },
  module: {
    loaders: [
      {test: /\.js$/,exclude: /node_modules/,loader: "babel-loader"}
    ]
  }
};
