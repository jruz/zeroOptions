const Path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const Shared = {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: Path.resolve('./dist'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};

module.exports = Shared;
