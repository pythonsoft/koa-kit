const service = {};
const path = require('path');
const fs = require('fs');
const mime = require('mime');
require('../../model/shelfTaskInfo');
const result = require('../../common/result');
const utils = require('../../common/utils');
const config = require('../../config');
const mongoose = require('mongoose');
const ShelfTaskInfo = mongoose.model('ShelfTaskInfo');

service.downloadFile = async function downloadFile(ctx, shelfTaskId, token) {
  let type = '';
  try {
    let deToken = utils.decipher(token, config.KEY);
    const codes = deToken.split(',');
    type = codes[0];
    const expireDate = codes[1];

    const now = new Date().getTime();

    if (expireDate < now) { // 过期
      ctx.body = result.fail(ctx.t('linkExpired'));
    } else {
      const doc = await ShelfTaskInfo.findOne({ _id: shelfTaskId }, 'name files');
      if (!doc) {
        ctx.body = result.json(ctx.t('cannotFindFile'));
      } else {
        const files = doc.files;
        let filePath = '';
        let fileName = doc.name;
        let suffix = '';
        for (let i = 0, len = files.length; i < len; i++) {
          if (files[i].type === type) {
            filePath = files[i].path;
            break;
          }
        }

        if (!filePath) {
          ctx.body = result.json(ctx.t('cannotFindFile'));
        } else {
          suffix = filePath.split('.');
          const len = suffix.length;
          if (len > 1) {
            suffix = suffix[len - 1];
            fileName += '.' + suffix;
          }
          ctx.body = fs.createReadStream(filePath);
          const mimetype = mime.getType(filePath);
          ctx.set('Content-disposition', 'attachment; filename=' + fileName);
          ctx.set('Content-type', mimetype);
          return filePath;
        }
      }
    }
  } catch(e) {
    ctx.body = result.json(ctx.t('invalidLink'));
  }
}

module.exports = service;