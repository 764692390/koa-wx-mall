import koaRouter from 'koa-router';

import user from './user';


const router = koaRouter();

router
  .use('/user', user.routes())
  

export default router;