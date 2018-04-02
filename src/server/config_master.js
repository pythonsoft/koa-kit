/**
 * Created by steven on 17/5/5.
 */

'use strict';

config.mongodb = {
  // [`${config.dbName}URL`]: `mongodb://localhost:27017/${config.dbName === 'ump' ? 'ump_v1' : 'ump_test'}`,
  umpURL: 'mongodb://10.0.15.62:27017/ump_v1',
};
config.KEY = 'secret';


config.port = process.env.NODE_ENV === 'development' ? 3000 : 3001;

config.umpApiUrl = 'http://localhost:8080/';