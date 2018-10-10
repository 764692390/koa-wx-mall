import koaRouter from 'koa-router'
import { shop } from '../../../controllers'
const router = koaRouter()

router
  .get('/getList', shop.getList)
  .get('/BranchType', shop.BranchType)
  .get('/BranchTypeDetail', shop.BranchTypeDetail)
  .get('/:id', shop.find)
  .get('/', shop.findAll)
  .get('/Detail/:id', shop.Detail)
  
  // .post('/', shop.create)
  // .put('/:id', shop.update)
  // .patch('/:id', shop.patch)
  // .delete('/:id', shop.remove);

export default router