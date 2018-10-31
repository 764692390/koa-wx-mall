import { res, err } from '../../libs/format';
import Redis from '../../db/redis'

class BaseController {
  constructor(services) {
    this._services = new services
    this.Redis = Redis;
  }

  find = async ctx => {
    const id = ctx.params.id
    let result

    try {
      const data = await this._services.find({ id })
      result = res({ data })
    } catch (e) {
      result = err(e)
    }

    ctx.body = result
  }

  findAll = async ctx => {
    let result

    try {
      const data = await this._services.findAll(ctx.query)
      result = res({ data })
    } catch (e) {
      result = err(e)
    }

    ctx.body = result
  }

  create = async ctx => {
    const params = ctx.request.body
    let result

    try {
      const data = await this._services.create(params);
      result = res({ data })
    } catch (e) {
      result = err(e)
    }

    ctx.body = result
  }

  update = async ctx => {
    const id = ctx.params.id
    const params = ctx.request.body
    let result

    try {
      const data = await this._services.update(id, params)
      result = res({ data })
    } catch (e) {
      result = err(e)
    }

    ctx.body = result
  }

  patch = async ctx => {
    const id = ctx.params.id
    const params = ctx.request.body
    let result

    try {
      const data = await this._services.update(id, params)
      result = res({ data })
    } catch (e) {
      result = err(e)
    }

    ctx.body = result
  }

  remove = async ctx => {
    const id = ctx.params.id
    let result

    try {
      const data = await this._services.remove(id)
      result = res({ data })
    } catch (e) {
      result = err(e)
    }

    ctx.body = result
  }

  /* 分页 */
  getList = async ctx => {
    let result

    try {
      const data = await this._services.getList(ctx)
      result = res({ data })
    } catch (e) {
      result = err(e)
    }

    ctx.body = result
  }
}

export default BaseController