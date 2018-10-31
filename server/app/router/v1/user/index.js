import koaRouter from 'koa-router'
import { user } from '../../../controllers'
const router = koaRouter()

router
  .get('/getUserList',user.getList) // 获取用户列表
  .get('/codeToOpenId',user.codeToOpenId) // 通过code获取用户openId
  .post('/register', user.register) // 注册
  .get('/check-token', user.checkToken) // 验证token
 

export default router