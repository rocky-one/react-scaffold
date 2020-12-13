var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var config = {
  entry: {
    'react': 'react',
    'react-dom': 'react-dom'
  },
  output: {
    path: path.join(__dirname, '../dist/vendor'),
    publicPath: '/vendor',
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd'
  },
  mode: 'production',
  //插件
  plugins: [
    new CleanWebpackPlugin(['dist/vendor'], {
      root: process.cwd(),
      verbose: true,
      dry: false,
      exclude: [],
    })
  ],
};
webpack(config, function (err, stats) {
  console.log(stats.toString({
    chunks: false,
    colors: true
  }));
});