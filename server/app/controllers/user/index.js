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
        if (result.openid) {
            let data = {
                "errno": "0",
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
            if (params.openid && params.session_key) {
                // 设置session  
                let userInfo = { ...params, openId: params.openid, timer: new Date().getTime() };
                this.Redis.set(params.openid, JSON.stringify(userInfo));

            } else {
                result = { 'errno': 1027, 'errmsg': false, 'errmsg': 'openid或者session_key不能为空' };
                ctx.body = result
                return;
            }

            // 根据 openId 查询用户是否存在    
            const findOpenId = await this._services.findOpenId({ openId: params.openid });
            if (findOpenId.length > 0) {
                result = { 'errno': 1021, 'errmsg': false, 'errmsg': '用户已存在' }
                ctx.body = result
                return;
            }

            // 用户不存在 存库
            const data = await this._services.create({ ...params, openId: params.openid });
            result = res({ data })

        } catch (e) {
            result = err(e)
        }

        ctx.body = result
    }

    // 验证token checkToken
    checkToken = async ctx => {
        let { token, session_key } = ctx.request.query
        let result

        if (token && session_key) {
            let d = await this.Redis.get(token);
            let data = JSON.parse(d);
            if (data.session_key === session_key) {
                result = { 'errno': 0, 'errmsg': true, 'errmsg': '获取用户信息成功'}
            } else {
                result = { 'errno': 1026, 'errmsg': false, 'errmsg': '用户未登录' }
            }
        } else {
            result = { 'errno': 1026, 'errmsg': false, 'errmsg': '用户未登录' }
        }

        ctx.body = result
    }

}

export default new Controller