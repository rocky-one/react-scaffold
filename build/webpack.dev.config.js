const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackDevServer = require('webpack-dev-server');
const merge = require('webpack-merge');
// const opn = require('opn');
const getBaseConfig = require('./webpack.base.config.js');

const config = getBaseConfig('dlldev', 'development', 'main');
const { devport } = require('./constBase.js');

const dllDevConfig = {
  devtool: 'cheap-module-source-map',
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
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname),
      manifest: require('./manifest.json'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/template/index.html'),
      inject: true,
    }),
  ],
};
const newConfig = merge(config, dllDevConfig);
//  热替换
Object.keys(newConfig.entry).forEach((name) => {
  newConfig.entry[name] = [
    `webpack-dev-server/client?http://localhost:${devport}/`,
    // "webpack/hot/only-dev-server"
  ].concat(newConfig.entry[name]);
});
// 代理配置
const proxyConfig = {
  target: 'http://localhost:8080',
  secure: false,
  changeOrigin: true,
};
const compiler = webpack(newConfig);
const server = new webpackDevServer(compiler, {
  hot: true,
  // port: devport,
  open: true,
  // publicPath: '/',
  // host: 'localhost',
  contentBase: path.join(__dirname, '../dist/'),
  historyApiFallback: true,
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
  // progress: true,
  // proxy: {
  // 	'/c1/*':proxyConfig,
  // 	'/auth/*':proxyConfig,
  // 	'/contextMenu':proxyConfig,
  // 	'/attrModel':proxyConfig,
  // 	'/dimension':proxyConfig,
  // }
});

server.listen(devport, '127.0.0.1', () => {
  // opn(`http://localhost:${devport}/`);
});
