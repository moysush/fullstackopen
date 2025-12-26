const path = require('path');
const { presets } = require('./babel.config');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'

  console.log(argv.mode);
  
  const backend_url = isProd ? 'https://notes2023.fly.dev/api/notes'
    : 'http://localhost:3001/notes';

  return {
    mode: argv.mode || 'development',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      static: path.resolve(__dirname, 'dist'),
      compress: true,
      port: 3000,
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:3001',
          changeOrigin: true
        }
      ]
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
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ]
  }
};
