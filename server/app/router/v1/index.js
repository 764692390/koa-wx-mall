import koaRouter from 'koa-router';

import home from './home';
import shop from './shop';
import user from './user';


const router = koaRouter();

router
  .use('/home', home.routes())
  .use('/shop', shop.routes())
  .use('/user', user.routes())
  

export default router;