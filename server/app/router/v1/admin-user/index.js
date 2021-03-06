import koaRouter from 'koa-router'
import { amdinUser } from '../../../controllers'
const router = koaRouter()

router
  .post('/register', amdinUser.register) // 注册
  .post('/login', amdinUser.login)      //  登录
  .get('/getUserInfo', amdinUser.getUserInfo)      // 获取用户基本信息
 

export default router