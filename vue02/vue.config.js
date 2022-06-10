const webpack = require('webpack');
const packageJson = require('./package.json');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  lintOnSave : true,
  publicPath : './',
  devServer  : {
    host    : 'localhost',
    https   : true,
    port    : 8080,
    overlay : {
      warnings : false,
      errors   : false
    }
  },
  css : {
    loaderOptions : {
      scss : {
        prependData :
          '@import "~@sigle/dl-pj-sigle-layout/src/layout/main.scss";'
      }
    }
  },
  configureWebpack : {
    plugins : [
      new StyleLintPlugin({
        'files' : ['src/**/*.{vue,css,scss}']
      }),
      new webpack.DefinePlugin({
        'process.env' : {
          APP_VERSION : `"${packageJson.version}"`
        }
      })
    ]
  }
};
