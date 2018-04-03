
'use strict';

const en = require('../../i18n/en/translation');
const zh = require('../../i18n/zh/translation');
const i18next = require('i18next');
const Backend = require('i18next-sync-fs-backend'); // or i18next-node-fs-backend
const koaI18next = require('koa-i18next');

module.exports = (app) => {
  i18next
    .use(Backend)
    .init({
      returnObjects: true,
      resources: {
        en: {
          translation: en,
        },
        zh: {
          translation: zh,
        },
      },
      preload: ['zh', 'en'], // must know what languages to use
      fallbackLng: 'zh',
    });

  app.use(koaI18next(i18next, {
    lookupCookie: 'i18next', // detecting language in cookie
    /**
     * Detecting language in path params, need third part route middleware.
     * Example
     * path: `/api/:lng/hello
     */
    lookupPath: 'lng',
    lookupFromPathIndex: 0, // detecting language in path, like `/api/zh/hello` which `zh` is the language and the index is 1
    lookupQuerystring: 'lng', // detect language in query,
    lookupSession: 'lng', // detect language in session
    /**
     * support querystring, cookie, header, session, path
     * default order: ['querystring', 'cookie', 'header']
     */
    order: ['querystring'],
    next: true, // if koa is version 2
  }));
};
