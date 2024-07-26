'use strict';

const SETTINGS = require('../../webpack.settings');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports.prodStyleConfig= {
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                include: SETTINGS.PATHS.style,
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.[chunkhash].css',
            disable: false,
            allChunks: true
        })
    ] 
};

module.exports.devStyleConfig = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: SETTINGS.PATHS.style,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};