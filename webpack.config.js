var webpack = require('webpack');

module.exports = {
  entry: './js/jumper.js',
  devtool: ['source-map'],

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
    ],
  },

  resolve: {
    root: __dirname,
    extensions: ['', '.js'],
  },

  output: {
    path: './dist/',
    filename: 'jumper.js',
  },
};
