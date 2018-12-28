import koaRouter from 'koa-router'
import { userLog } from '../../../controllers'
const router = koaRouter()

router
  .get('/getList',userLog.getList) // 获取用户列表
 

export default router