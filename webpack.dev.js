const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Shared = require('./webpack.shared.js');

const Config = {
  mode: 'development',
  watch: true,
  optimization: {
    noEmitOnErrors: true,
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    sockHost: 'f1b225c8f47f.eu.ngrok.io',
    hot: true,
    stats: {
      modules: false,
      children: false,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  module: {
    ...Shared.module,
    rules: [
      ...Shared.module.rules,
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              modules: true,
              sourceMap: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [...Shared.plugins, new ForkTsCheckerWebpackPlugin()],
};

module.exports = { ...Shared, ...Config };
