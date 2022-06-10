const CopyWebpackPlugin = require('copy-webpack-plugin');
// const path = require('path');
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
          '@import "~@indra-dl/dl-fmwk-ui-layout/src/layout/main.scss";'
      }
    }
  },
  configureWebpack : {
    plugins : [
      new StyleLintPlugin({
        'files' : ['src/**/*.{vue,css,scss}']
      }),
      // Copy Cesium Assets, Widgets, and Workers to a static directory
      new CopyWebpackPlugin([
        { from : 'node_modules/cesium/Build/Cesium/Workers', to : 'Workers' }
      ]),
      new CopyWebpackPlugin([
        {
          from : 'node_modules/cesium/Build/Cesium/ThirdParty',
          to   : 'ThirdParty'
        }
      ]),
      new CopyWebpackPlugin([
        { from : 'node_modules/cesium/Build/Cesium/Assets', to : 'Assets' }
      ]),
      new CopyWebpackPlugin([
        { from : 'node_modules/cesium/Build/Cesium/Widgets', to : 'Widgets' }
      ]),
      new webpack.DefinePlugin({
        'process.env' : {
          APP_VERSION : `"${packageJson.version}"`
        },
        CESIUM_BASE_URL : JSON.stringify('/')
      })
    ]
  }
};
