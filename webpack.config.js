var webpack = require('webpack'),
    path = require('path');

module.exports = {
  entry: './js/main.js',
  devtool: ['source-map'],

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
    ],
  },

  resolve: {
    root: path.join(__dirname, 'js'),
    extensions: ['', '.js'],
  },

  output: {
    path: './dist/',
    filename: 'jumper.js',
  },
};
