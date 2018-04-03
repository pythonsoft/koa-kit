'use strict';

module.exports = function api(app) {
  app.use('/api/download', require('./api/download').routes(), require('./api/download').allowedMethods());
};
