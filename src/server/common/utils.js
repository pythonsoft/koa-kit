const utils = {};
const request = require('request');
const i18n = require('i18next');
const crypto = require('crypto');

/**
 * @param uri
 * @param method "POST" or "GET"
 * @param info
 * @param cb
 */
utils.baseRequestCallApi = function baseRequestCallApi(url, method, info, token, cb) {
  const options = {
    method: method || 'GET',
    url,
  };
  if (method === 'POST') {
    options.form = JSON.parse(JSON.stringify(info));
    options.headers = {
      'content-type': 'application/x-www-form-urlencoded',
      cache: 'no-cache',
      token,
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    };
  } else {
    options.qs = info;
    options.headers = {
      'cache-control': 'no-cache',
      token,
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    };
  }

  request(options, (error, response) => {
    if (!error && response.statusCode === 200) {
      return cb && cb(null, response);
    } else if (error) {
      logger.error(error);
      return cb && cb(i18n.t('requestCallApiError', { error }));
    }
    logger.error(response.body);
    return cb && cb(i18n.t('requestCallApiFailed'));
  });
};

/**
 * @param uri
 * @param method "POST" or "GET"
 * @param info
 * @param cb
 */
utils.requestCallApi = function requestCallApi(url, method, info, token, cb) {
  utils.baseRequestCallApi(url, method, info, token, (err, response) => {
    // console.log('requestCallApi ------>', response.body, err);
    if (err) {
      return cb && cb(err);
    }
    const rs = JSON.parse(response.body);
    return cb && cb(null, rs);
  });
};

utils.getValueType = function getValueType(val) {
  return typeof val === 'undefined' ? 'undefined' : val.constructor.name.toLocaleLowerCase();
};

/**
 *
 * @param info
 * @param struct {Object}
 */
utils.validation = function validation(info, struct) {
  let temp = null;

  for (const k in struct) {
    temp = struct[k];

    if (!info[k]) {
      return i18n.t('fieldIsNotExistError', { field: k });
    }

    if (typeof temp.type !== 'undefined' && utils.getValueType(info[k]) !== temp.type) {
      return i18n.t('typeError', { field: k });
    }

    if (temp.validation) {
      if (temp.validation === 'require') {
        if (info[k] !== 0 && !info[k]) {
          return i18n.t('requireError', { field: k });
        }
      } else if (typeof temp.validation === 'function' && !temp.validation(info[k])) {
        return i18n.t('validationError', { field: k });
      }
    }
  }

  return null;
};

utils.cipher = function cipher(str, key) {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let crypted = cipher.update(str, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

utils.decipher = function decipher(str, key) {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let dec = decipher.update(Buffer.from(str, 'hex'), 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

module.exports = utils;