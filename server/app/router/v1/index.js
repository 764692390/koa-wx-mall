import koaRouter from 'koa-router';

import user from './user';
import userLog from './user-log';
import adminUser from './admin-user';
import workUser from './work-user';


const router = koaRouter();

router
  .use('/user', user.routes())
  .use('/userLog', userLog.routes())
  .use('/adminUser', adminUser.routes())
  .use('/workUser', workUser.routes())
  

export default router;