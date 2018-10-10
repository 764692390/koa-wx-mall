import koaRouter from 'koa-router'
import { user } from '../../../controllers'
const router = koaRouter()

router
  .get('/',user.getUser)
  .get('/signOut',user.signOut)
  .get('/code',user.setCode)
  .post('/register', user.register)
  .post('/signIn', user.signIn)


export default router