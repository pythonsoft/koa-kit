const webpackConfig = require('../../webpack.config')
const webpack = require('webpack');
const path = require('path');
const del = require('del');
const fs = require('fs');

const apiRootPath = path.join(__dirname, './api');
const apiPathFile = path.join(__dirname, './apiPath.js');

del.sync(apiPathFile);

// 读取api接口路径,写入文件
const writeToApiPath = function writeToApiPath() {
  const files = fs.readdirSync(apiRootPath);
  fs.appendFileSync(apiPathFile, "'use strict';\n\nmodule.exports = function api(app) {\n");
  files.forEach((filename) => {
    const fullname = path.join(apiRootPath, filename);
    const stats = fs.statSync(fullname);
    if (stats.isDirectory()) {
      fs.appendFileSync(apiPathFile, `  app.use('/api/${filename}', require('./api/${filename}').routes(), require('./api/${filename}').allowedMethods());\n`);
    }
  });
  fs.appendFileSync(apiPathFile, '};\n');
};

writeToApiPath();

webpack(webpackConfig, (err, stats) => {
  if (err) {
    // Handle errors here
    throw new Error(JSON.stringify(err.errors));
  } else if (stats.hasErrors()) {
    throw new Error(stats.compilation.errors);
  }
  console.log('server webpack completely...');
});