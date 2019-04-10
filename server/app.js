import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import jwtKoa from 'koa-jwt'
import error from './app/middlewares/error';
//import koaStatic from 'koa-static'
import koaStaticCache from 'koa-static-cache'
import cors from '@koa/cors'
import router from './app/router';
import config from './app/config';
import log from './app/middlewares/log';
import session from 'koa-session-redis';

const secret = 'jwt_demo'
const app = new Koa();

app.keys = ['keys', 'keykeys'];
// const CONFIG = {
//     key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
//     maxAge: 86400000,
//     overwrite: true, /** (boolean) can overwrite or not (default true) */
//     httpOnly: true, /** (boolean) httpOnly or not (default true) */
//     signed: true, /** (boolean) signed or not (default true) */
//     rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
//     renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
//   };

app
    .use(error())
    //.use(koaStatic(__dirname + "/app/public"))
    .use(koaStaticCache(__dirname + "/app/public", {
        maxAge: 365 * 24 * 60 * 60
    }))
    .use(session({
        store: {
            host: '127.0.0.1',
            port: 6379,
            ttl: 3600 * 24,
        },
    }))
    .use(jwtKoa({ secret }).unless({
        path: [
            '/api/v1/user/codeToOpenId', // 微信code换openId
            '/api/v1/user/register',    //  微信用户注册
            '/api/v1/user/check-token', //  微信用户验证token
            '/api/v1/adminUser/login', // 后台登录
            '/api/v1/adminUser/register', // 注册
            '/api/v1/userLog/getList', // 获取日志列表

        ] //数组中的路径不需要通过jwt验证
    }))
    .use(log())
    .use(cors())
    .use(bodyParser())
    // .use(session(CONFIG, app))
    .use(router.routes(), router.allowedMethods())

app.listen(config.port, () => console.log(`node server start success port=${config.port}`));

export default app;