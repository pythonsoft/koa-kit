const Router = require('koa-router');
const router = new Router();
const service = require('./service');

router.get('/file/:shelfTaskId', async (ctx) => {
  const params = ctx.params;
  const shelfTaskId = params.shelfTaskId;
  const token = ctx.query.token;
  await service.downloadFile(ctx, shelfTaskId, token);
});

module.exports = router;