'use strict';

module.exports = function api(router) {
  router.use('/api/download', require('./api/download').routes(), require('./api/download').allowedMethods());
};
