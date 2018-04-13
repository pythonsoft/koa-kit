'use strict';

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./src/server/app.js'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js',
    chunkFilename: 'server.[name].js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  /* eslint-disable no-useless-escape */
  externals: [
    /^\.\/assets$/,
    /^[@a-z][a-z\/\.\-0-9]*$/i,
  ],
  /* eslint-enable no-useless-escape */
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    inline: true,
  },
  module: {

  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './src/server/config_master.js'),
        to: path.resolve(__dirname, './build/config_master.js'),
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, './package.json'),
        to: path.resolve(__dirname, './build/package.json'),
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, './pm2.json'),
        to: path.resolve(__dirname, './build/pm2.json'),
        ignore: ['.*']
      },
    ])
  ]
}