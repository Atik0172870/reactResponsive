const HtmlWebpackPlugin =require('html-webpack-plugin');
const HtmlWebpackTemplate =require('html-webpack-template');

module.exports = (config) => {
  const htmlWebpackTemplateConfig = {
    appMountId: config.appMountId,
    baseHref: config.baseHref,
    cache: true,
    //favicon: 'favicon.ico',
    filename: config.filename,
    inject: config.inject,
    links: config.links,
    meta: config.meta,
    mobile: true,
    title: config.title,
    template: config.template || HtmlWebpackTemplate
  };

  const webpackConfig = {
    plugins: [
      new HtmlWebpackPlugin(htmlWebpackTemplateConfig)
    ]
  };

  return webpackConfig;
};