import Koa from 'koa'
import koaRouter from 'koa-router'
import bodyParser from 'koa-bodyparser'
import views from 'koa-views'
import koaStatic from 'koa-static'
import cors from '@koa/cors'
import session from 'koa-session'
import router from './app/router';
import config from './app/config';
import log from './app/middlewares/log';

const app = new Koa();

app.keys = ['keys', 'keykeys'];
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  };

app
    .use(log())
    .use(cors())
    .use(bodyParser())
    .use(session(CONFIG, app))
    .use(koaStatic(__dirname + "/app/public"))
    .use(
        views(__dirname + "/app/views", {
            extension: "ejs"
        })
    )
    .use(router.routes(), router.allowedMethods())

app.listen(config.port, () => console.log(`node server start success port=${config.port}`));

export default app;