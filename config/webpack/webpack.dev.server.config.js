const webpack = require('webpack');

module.exports = (port, contentBase, compress, proxy, setup) => {
  const config = {
    contentBase: contentBase
    //,quiet: false
    , port: port
    //,compress: compress
    , historyApiFallback: true
    , hot: true
    , inline: true
    , open: true
    , proxy: proxy,
    //,setup: setup
  };

  return {
    devServer: config
    , plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }
};
