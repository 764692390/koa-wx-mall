import { Shop } from '../../services'
import BaseController from '../base-controller'
import { res, err } from '../../libs/format';

class Controller extends BaseController {
  constructor() {
    super(Shop)
  }
  Detail = async ctx => {
    let result
    try {
      const data = await this._services.Detail(ctx)
      result = res({ data })
    } catch (e) {
      result = err(e)
    }

    ctx.body = result
  }

  BranchType = async ctx => {
    
    let result
    try {
      const data = await this._services.BranchType(ctx)
      result = res({ data })
    } catch (e) {
      result = err(e)
    }

    ctx.body = result
  }

  BranchTypeDetail = async ctx=> {
    let result
    try {
      const data = await this._services.BranchTypeDetail(ctx)
      result = res({ data })
    } catch (e) {
      result = err(e)
    }

    ctx.body = result
  }
}

export default new Controller