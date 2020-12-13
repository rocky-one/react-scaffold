const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function scssLoader(processEnv, useCssModules = false) {
  if (useCssModules) {
    return {
      test: /\.(scss|sass)$/,
      // 匹配后缀是否有?modules，如果有说明使用了css modulees
      resourceQuery: /modules/,
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
        'postcss-loader',
        'sass-loader'
      ]
    }
  }

  return {
    test: /\.(scss|sass)$/,
    use: [
      {
        loader: processEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
      },
      'postcss-loader',
      'sass-loader'
    ]
  }
}

function cssLoader(processEnv, useCssModules = false) {
  if (useCssModules) {
    return {
      test: /\.css$/,
      // 匹配后缀是否有?modules，如果有说明使用了css modulees
      resourceQuery: /modules/,
      use: [
        {
          loader: processEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]-[hash:base64:4]',
          }
        }
      ]
    }
  }

  return {
    test: /\.css$/,
    use: [
      {
        loader: processEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader'
      }
    ]
  }
}

function tsLoader() {
  return {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      'cache-loader',
      'babel-loader',
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      }
    ]
  }
}

function lessLoader(processEnv, useCssModules = false) {
  if (useCssModules) {
    return {
      test: /\.less$/,
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
        'less-loader'
      ]
    }
  }

  return {
    test: /\.less$/,
    use: [
      {
        loader: processEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
      },
      'less-loader'
    ]
  }
}

function urlLoader() {
  return {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    exclude: /node_modules/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'images/[name].[hash:7].[ext]',
      },
    }
  }
}

function iconfontLoader() {
  return {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    exclude: /node_modules/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'iconfont/[name].[hash:7].[ext]',
      },
    }],
  }
}

module.exports = {
  scssLoader,
  cssLoader,
  lessLoader,
  tsLoader,
  urlLoader,
  iconfontLoader
}