var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ElectronPackager = require("webpack-electron-packager");
var commonConfig = require('./webpack.commmon');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {

  output: {
    path: helpers.root('electron'),
    publicPath: '',
    filename: '[name].js',
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  plugins: [
    new ElectronPackager({
      dir: "/electron",
      arch: "x64",
      platform: "linux",
    })
  ]
});



