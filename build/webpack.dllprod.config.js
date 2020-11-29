const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const getBaseConfig = require('./webpack.base.config.js');

const config = getBaseConfig('dllprod', 'production', 'main');

const dllProdconfig = {
  cache: true,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'main',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist/js/*.js', 'dist/css/*.css', 'dist/images', 'dist/index.html'], {
      root: process.cwd(),
      verbose: true,
      dry: false,
      exclude: ['dist/js/vendor'],
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname), // 和dll文件的context对应
      manifest: require('./manifest.json'), // 加载dll编译时输出的 json文件，第三方库不再打包处理
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/template/index.html'),
      inject: true,
    }),
  ],
};

const newConfig = merge(config, dllProdconfig);
webpack(newConfig, (err, stats) => {
  console.log(stats.toString({
    chunks: false,
    colors: true,
  }));
});
