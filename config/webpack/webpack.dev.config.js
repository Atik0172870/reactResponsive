const commonConfig = require('./webpack.common.config');
const SETTINGS = require('../../webpack.settings');
const merge = require('webpack-merge');
const webpackDefinePluginConfig = require('./webpack-define-plugin.config');
const webpackDevServerConfig = require('./webpack.dev.server.config');
const devStyleConfig = require('./style.config').devStyleConfig;
const htmlWebpackPluginConfig = require('./html-webpack-plugin.config');

const ds = SETTINGS.devServer;
const part = {
    entry: [
        'babel-polyfill',
        'promise-polyfill',
        'whatwg-fetch',
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8077',
        'webpack/hot/only-dev-server',
        SETTINGS.PATHS.app
    ]
    , output: {
        filename: "[name].js",
        path: SETTINGS.PATHS.output,
        publicPath: '/'
    }
    //, devtool: "eval-source-map"
    , devtool: 'inline-source-map'
};

module.exports = merge(
    commonConfig
    , part
    , htmlWebpackPluginConfig(SETTINGS.devhtml)
    , devStyleConfig
    , webpackDevServerConfig(ds.port, ds.contentBase, ds.compress, ds.proxy, ds.setup)
    , webpackDefinePluginConfig({
        API_URL: JSON.stringify(SETTINGS.apiURL.dev)
        , 'process.env': {
            NODE_ENV: JSON.stringify('development')
        }
        , PROD: JSON.stringify(false)
    })
);
