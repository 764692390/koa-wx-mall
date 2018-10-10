import koaRouter from 'koa-router'
import v1 from './v1'

const router = koaRouter()

router
    .use('/api/v1', v1.routes(), v1.allowedMethods())


export default router