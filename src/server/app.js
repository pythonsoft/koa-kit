const Koa = require('koa');

const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const config = require('./config');

app.use(bodyParser()); // for parsing application/json
require('./middleware/i18n')(app);

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.umpURL, (err) => {
  if (err) {
    throw err;
  }

  console.log('connect mongodb success!');
});

require('./apiPath')(router);

app.use(router.routes(), router.allowedMethods());

app.listen(config.port, () => {
  console.log('server listen on port 3000==>');
});
