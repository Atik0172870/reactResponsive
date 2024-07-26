'use strict';

const SETTINGS = require('../../webpack.settings');
const merge = require('webpack-merge');
const webpack = require('webpack');

const part = {
  resolve: {
    extensions: [".webpack.js", ".web.js", ".jsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: SETTINGS.PATHS.src,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader'
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
          loader: 'file-loader?name=public/fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
      new webpack.NamedModulesPlugin()      
  ]
};

module.exports = merge(
  part
);
