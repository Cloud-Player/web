var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.commmon');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  // debug: true,
  // devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
