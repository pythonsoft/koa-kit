/**
 * Created by steven on 17/5/5.
 */

'use strict';

const path = require('path');
const fs = require('fs');
const vm = require('vm');

const config = {};

config.dbInstance = {};

const configPath = path.join(__dirname, './config_master.js');

config.mongodb = {
  umpURL: 'mongodb://10.0.15.62:27017/ump_v1',
};
config.KEY = 'secret';

config.port = process.env.NODE_ENV === 'development' ? 3000 : 3001;

const readConfig = function readConfig(p) {
  const sandbox = {
    path,
    config,
    __dirname,
    console,
    process,
  };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(p), sandbox);
};

if (fs.existsSync(configPath)) {
  // 读取生产环境config_master.js文件
  readConfig(configPath);
  // init();
} else if (process.env.NODE_ENV === 'development') { // 本地开发环境
  readConfig(path.join(__dirname, './config_master.js'));
  config.host = `localhost:${config.port}`;
  config.domain = `http://${config.host}`;
  // init();
} else {
  throw new Error('******** config_master.js file is not exist ********');
}

module.exports = config;
