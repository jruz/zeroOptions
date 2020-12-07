const Path = require('path');

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
    ],
  },
  plugins: [],
};

module.exports = Shared;
