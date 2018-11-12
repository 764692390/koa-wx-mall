import koaRouter from 'koa-router'
import { workUser } from '../../../controllers'
const router = koaRouter()

router
  .post('/add', workUser.add) // 添加
  .post('/updata', workUser.updata) // 添加
  .get('/getList', workUser.getList)  // 获取列表

export default router