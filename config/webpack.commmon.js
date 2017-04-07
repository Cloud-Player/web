var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
var path = require('path');
var helpers = require('./helpers');
var packageJSON = require('../package.json');

module.exports = {
  // devtool: "source-map", // or "inline-source-map"

  entry: {
    'polyfills': './app/polyfills.ts',
    'vendor': './app/vendor.ts',
    'app': './app/main.ts'
  },

  resolve: {
    modules: [path.resolve(__dirname, '/app'), 'node_modules/'],
    descriptionFiles: ['package.json'],
    extensions: ['', '.js', '.ts', '.css']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.scss$/,
        loaders: ['raw-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.(jpe?g|png|gif|ico)(\?v=\d+\.\d+\.\d+)?$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[name].[hash].[ext]'
        ]
      }
    ],
    noParse: [new RegExp('./node_modules/localforage/dist/localforage.js')],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: './index.html'
    }),

    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJSON.version)
    }),

    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, '../app/service-worker.ts'),
      excludes: [
        '**/.*',
        '**/*.map',
        '*.html'
      ]
    })
  ]
};
