import koaRouter from 'koa-router';


const router = koaRouter();

router
    .get('/', (ctx, next) => {
       
        ctx.body= 'request'

    })



export default router;