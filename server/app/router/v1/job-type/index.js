import koaRouter from 'koa-router'
import { jobType } from '../../../controllers'
const router = koaRouter()

router
  .get('/getAll', jobType.findAll) // 获取工作类型


export default router