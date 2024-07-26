const resolve = require('path').resolve;

module.exports = {
  PATHS: {
    app: resolve(__dirname, 'src/index.js'),
    src: resolve(__dirname, 'src'),
    output: resolve(__dirname, 'build'),
    style: resolve(__dirname, 'src/styles')
  },
  apiURL: {
    prod: 'http://localhost:8094/',
     dev: 'http://localhost:8075/'
  },
  devServer: {
    port: 8075,
    contentBase: resolve(__dirname, 'dist'),
    compress: true,
    proxy: {
      '/Token': 'http://localhost:24207/',
      '/api': 'http://localhost:24207/',
    },
    setup: function (app) {
      app.get('/api/foo', function (req, res) {
        res.json({ foo: 'bar' });
      });
    }
  },
  devhtml: {
    appMountId: 'root',
    baseHref: '/',
    links: [
      //'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'
    ],
    meta: [
      {

      }
    ],
    title: 'HIDMobileAccess',
    filename: 'index.html',
    inject: false
  },
  prodhtml: {
    appMountId: 'root',
    baseHref: '/',
    links: [
      //'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'
    ],
    meta: [
      {

      }
    ],
      title: 'FIRMWARE DOWNLOAD',
    filename: resolve(__dirname, '../Views/Home/', 'Index.cshtml'),
    template: 'Index.cshtml',
    inject: true
  },
  copy: {
    patterns: [
      //{
      //  from: resolve(__dirname, 'src/content'),
      //  to: './content'
      //}
      //, {
      //  from: resolve(__dirname, 'Web.config')
      //}
    ]
  }
};