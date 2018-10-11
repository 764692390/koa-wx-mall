import koaRouter from 'koa-router'
import v1 from './v1'
import page from './page'

const router = koaRouter()

router
    .use('/', page.routes(), page.allowedMethods())
    .use('/api/v1', v1.routes(), v1.allowedMethods())


export default router