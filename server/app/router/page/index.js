import koaRouter from 'koa-router';

const router = koaRouter();

router
  .get('/', (ctx, next) => {
        ctx.body  = { 'errno': 1, 'errmsg': 'Api接口',data:[
            {'url':'/api/v1/user/codeToOpenId?code=333', name:'通过code获取openid'},
            {'url':'/api/v1/user/register', name:'注册用户'}
        ] }
  })

  

export default router;