const path = require('path');
const { presets } = require('./babel.config');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3000
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
};
