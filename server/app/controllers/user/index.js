import { User } from '../../services'
import BaseController from '../base-controller'
import { res, resError, err } from '../../libs/format';

class Controller extends BaseController {
  constructor() {
    super(User)
  }
  //通过code获取用户openId
  codeToOpenId = async ctx => {
    let { code } = ctx.request.query 
    let result = await this._services.getOpenId(code);
    if(result.openid) {
        let data = {
            "errno":"0",
            "errmsg": true,
            "data": result
        }
        ctx.body = data
    } else {
        let data = resError(result)
        ctx.body = data
    }
  }

  // 注册
  register = async ctx => {
    const params = ctx.request.body
    let result

    try {
      // 根据openId查询用户是否存在      
      const findOpenId = await this._services.findOpenId({ openId: params.openId });
      if (findOpenId.length > 0) {
        result = { 'errno': 1021, 'errmsg': false, 'errmsg': '用户已存在' }
        ctx.body = result
        return;
      }

      const data = await this._services.create(params);
      result = res({ data })

    } catch (e) {
      result = err(e)
    }

    ctx.body = result
  }
 
}

export default new Controller