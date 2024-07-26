const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (patterns, options) => {
  return {
    plugins: [
      new CopyWebpackPlugin(patterns, options)
    ]
  };
};

