const webpack = require('webpack');
const HappyPack = require('happypack');
const os = require('os');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const path = require('path');
const { vendor } = require('./constBase.js');

const app = process.env.NODE_ENV_APP;

function getBaseConfig(dll, processEnv, entryName) {
  return {
    entry: {
      [entryName]: dll === 'dll' ? vendor : path.resolve(__dirname, '../src/index.tsx'),
    },
    mode: processEnv,
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      filename: 'js/[name].[chunkhash:8].js',
      chunkFilename: 'js/[name].[chunkhash:8].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
      modules: [path.resolve(__dirname, '../node_modules')],
      alias: {
        react: path.resolve(__dirname, '../node_modules/react'),
        'react-dom': '@hot-loader/react-dom',
        'react-router-dom': path.resolve(__dirname, '../node_modules/react-router-dom'),
        axios: path.resolve(__dirname, '../node_modules/axios'),
        '@': path.resolve(__dirname, '../src'),
      },
      fallback: { "events": require.resolve("events") }
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[hash:7].[ext]',
            },
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          exclude: /node_modules/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'iconfont/[name].[hash:7].[ext]',
            },
          }],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: processEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]-[hash:base64:4]',
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: processEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            },
            'happypack/loader?id=less',
          ],
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            {
              loader: processEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            },
            'happypack/loader?id=sass',
          ],
        },
        {
          test: /\.css$/,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
              },
            },
          ],
        },
        {
          test: /\.(ts|tsx)$/,
          use: {
            loader: 'happypack/loader?id=ts',
          },
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      // new HappyPack({
      //   id: 'less',
      //   threadPool: HappyPack.ThreadPool({ size: os.cpus().length }),
      //   threads: 4,
      //   verbose: true,
      //   loaders: [
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //         localIdentName: '[local]-[hash:base64:4]',
      //       },
      //     },
      //     'postcss-loader',
      //     'less-loader',
      //   ],
      // }),
      new HappyPack({
        id: 'sass',
        threadPool: HappyPack.ThreadPool({ size: os.cpus().length }),
        threads: 4,
        verbose: true,
        loaders: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]-[hash:base64:4]',
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      }),
      new HappyPack({
        id: 'ts',
        threadPool: HappyPack.ThreadPool({ size: os.cpus().length }),
        threads: 4,
        verbose: true,
        loaders: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
            },
          },
        ],
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(processEnv),
        'process.env.NODE_ENV_APP': `'${app}'`,
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name]-[chunkhash:8].css',
        chunkFilename: 'css/[name].[chunkhash:8].css',
      }),
      // new DashboardPlugin(),
    ],
  };
}

module.exports = getBaseConfig;
