var webpackMerge = require('webpack-merge');
var ElectronPackager = require("webpack-electron-packager");
var commonConfig = require('./webpack.commmon');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {

  output: {
    path: helpers.root('dist_electron'),
    publicPath: '',
    filename: '[name].js',
  },

  plugins: [
    new ElectronPackager({
      dir: "./electron",
      arch: "x64",
      platform: "linux",
      version: "v1.4.13"
    })
  ]

});



