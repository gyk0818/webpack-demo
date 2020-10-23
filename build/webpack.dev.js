const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    proxy: {
      '/api': 'http://localhost:3000'
    },
    hot: true,
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  optimization: {
    usedExports: true
  }
}

module.exports = merge(commonConfig, devConfig);