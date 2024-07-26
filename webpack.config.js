const devConfig = require('./config/webpack/webpack.dev.config');
const prodConfig = require('./config/webpack/webpack.prod.config');

//var environment = process.env.NODE_ENV && (process.env.NODE_ENV).trim() === 'production' ? 'production' : 'development';

module.exports = (env) => {
  switch (env) {
    case 'prod':
      return prodConfig;
    case 'dev':
    default:
      return devConfig;
  }
}