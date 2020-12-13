const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const EslintDisablePlugin = require('./plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { scssLoader, cssLoader, tsLoader } = require('./loaderCore');
const processEnv = 'production';

const baseConfig = {
  entry: {
    'activity1/index': path.resolve(__dirname, '../src/activities/activity1/index.tsx'),
    'activity2/index': path.resolve(__dirname, '../src/activities/activity2/index.tsx'),
    'activity3/index': path.resolve(__dirname, '../src/activities/activity3/index.js')
  },
  mode: processEnv,
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: path.resolve(__dirname, '../lib'),
    library: '[name]',
    libraryTarget: 'umd'
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'vue': 'vue',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.scss', '.js', '.jsx'],
    // modules: [path.resolve(__dirname, '../node_modules')],
    // alias: {
    //   react: path.resolve(__dirname, '../node_modules/react'),
    //   'react-dom': '@hot-loader/react-dom',
    // }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            useRelativePath: true,
            context: path.resolve(__dirname, "../src/activities/"),
            name: '[name].[ext]',
            publicPath: './images',
            outputPath: path.resolve(__dirname, '../lib')
          }
        }
      },
      {
        oneOf: [
          cssLoader(processEnv, true),
          cssLoader(processEnv, false)
        ]
      },
      {
        oneOf: [
          scssLoader(processEnv, true),
          scssLoader(processEnv, false)
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      tsLoader()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['lib/**/*'], {
      root: process.cwd(),
      verbose: true,
      dry: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(processEnv)
    }),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { safe: true, autoprefixer: false, discardComments: { removeAll: true } },
      canPrint: true
    }),
    new CopyPlugin(
      {
        patterns: [
          {
            from: path.resolve(__dirname, '../src/activities/**/*.json'),
            to({ absoluteFilename }) {
              let toPath = absoluteFilename.split('activities/')[1];
              toPath = toPath.split('/')[0];
              return `../lib/${toPath}/[name].[ext]`;
            }
          }
        ]
      }
    ),
    new EslintDisablePlugin(),
    new VueLoaderPlugin(),

  ]
};


webpack(baseConfig, (err, stats) => {
  if (err) {
    console.log(err)
    return;
  }
  console.log(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    performance: false
  }));
});
