const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.config');
const SETTINGS = require('../../webpack.settings');
const copyWebpackPluginConfig = require('./copy-webpack-plugin.config');
const webpackDefinePluginConfig = require('./webpack-define-plugin.config');
const prodStyleConfig = require('./style.config').prodStyleConfig;
const cleanWebpackPluginConfig = require('./clean-webpack-plugin.config');
const htmlWebpackPluginConfig = require('./html-webpack-plugin.config');
const TerserPlugin = require('terser-webpack-plugin');


const part = {
  entry: {
    app: SETTINGS.PATHS.app,
    vendors: ['babel-polyfill', 'promise-polyfill','react', 'react-dom','whatwg-fetch']
  }
  , output: {
      filename: "[name].[chunkhash].js",
      chunkFilename: '[name].[chunkhash].js',
      path: SETTINGS.PATHS.output
  }
  , devtool: "source-map"
    , plugins: [
                new webpack.HashedModuleIdsPlugin(),
                new TerserPlugin()     
    ],
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
        , runtimeChunk: {
            name: "manifest",
        }
        , minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: true,
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    module: false,
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                },
            }),
        ],
    }
};


module.exports = merge(
  commonConfig
  , part
  , prodStyleConfig
  , copyWebpackPluginConfig(SETTINGS.copy.patterns)
  , cleanWebpackPluginConfig(SETTINGS.PATHS.output)
  , htmlWebpackPluginConfig(SETTINGS.prodhtml)
  , webpackDefinePluginConfig({
    API_URL: JSON.stringify(SETTINGS.apiURL.prod)
    , 'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
    , PROD: JSON.stringify(true)
  })
);
