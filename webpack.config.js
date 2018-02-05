var webpack = require('webpack');
var path = require('path');
var libraryName = 'jq-in-the-browser';
var outputFile = libraryName + '.js';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
  entry: './src/jq.js',
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  target: 'node',
  plugins: [new UglifyJsPlugin()],
  module: {
    loaders: [
      {
        test: /\.pegjs$/,
        loader: 'pegjs-loader?trace=false&cache=true'
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
    ]
  }
};
