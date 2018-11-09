import koaRouter from 'koa-router';

import user from './user';
import adminUser from './admin-user';


const router = koaRouter();

router
  .use('/user', user.routes())
  .use('/adminUser', adminUser.routes())
  

export default router;