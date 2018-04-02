'use strict';

const path = require('path');

module.exports = {
  entry: ['./src/server/app.js'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js',
    chunkFilename: 'server.[name].js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
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
}