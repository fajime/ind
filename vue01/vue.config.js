const fs = require('fs');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const packageJson = JSON.parse(fs.readFileSync('./package.json'));
const WorkerPlugin = require('worker-plugin');

module.exports = {
  lintOnSave : true,
  devServer  : {
    host    : 'localhost',
    https   : false,
    port    : 8080,
    overlay : {
      warnings : false,
      errors   : false
    }
  },
  css : {
    loaderOptions : {
      scss : {
        prependData : `@import "~@/sass/main.scss";`
      }
    }
  },
  configureWebpack : {
    plugins : [
      new StyleLintPlugin({
        'files' : ['src/**/*.{vue,css,scss}']
      }),
      new WorkerPlugin(),
      new webpack.DefinePlugin({
        'process.env' : {
          APP_VERSION : `"${packageJson.version}"`
        },
        // Define relative base path in cesium for loading assets
        CESIUM_BASE_URL : JSON.stringify('/')
      })
    ]
  }
};
