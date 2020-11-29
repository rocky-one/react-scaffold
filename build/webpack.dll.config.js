const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const rootPath = path.join(__dirname);
const merge = require('webpack-merge');
const getBaseConfig = require('./webpack.base.config.js');

const config = getBaseConfig('dll', 'production', 'vendor');

const webpackDll = {
  output: {
    path: path.join(__dirname, '../dist/js/vendor'),
    publicPath: '/js/vendor',
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    library: '[name]',
  },
  mode: 'production',
  // 插件
  plugins: [
    new CleanWebpackPlugin(['dist/js/vendor'], {
      root: process.cwd(),
      verbose: true,
      dry: false,
      exclude: [],
    }),
    new webpack.DllPlugin({
      path: path.join(rootPath, './manifest.json'), // path是manifest文件的输出路径
      name: '[name]', // name是dll暴露的对象名，要跟output.library保持一致；
      context: __dirname, // context是解析包路径的上下文，这个要跟build中配置保持一致。
    }),
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.(js|ts|jsx|tsx)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, '../src/template/index.html'),
      template: 'src/index.html',
      inject: true,
    }),
  ],
};
const newConfig = merge(config, webpackDll);
webpack(newConfig, (err, stats) => {
  console.log(stats.toString({
    chunks: false,
    colors: true,
  }));
});
