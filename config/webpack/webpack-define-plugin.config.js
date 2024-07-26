'use strict';

const DefinePlugin = require('webpack').DefinePlugin;

module.exports = (def) => ({
  plugins: [
    new DefinePlugin(def)
  ],
});