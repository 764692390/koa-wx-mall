import { workUser } from '../../services'
import BaseController from '../base-controller'
import { res, resError, err } from '../../libs/format';

class Controller extends BaseController {
    constructor() {
        super(workUser)
    }

    // 添加
    add = async ctx => {
        const params = ctx.request.body
        let result

        try {
            // 根据 phone 查询用户是否存在    
            const userInfo = await this._services.find({ phone: params.phone });
            if (userInfo !== null) {
                result = { 'errno': 1021, 'errmsg': false, 'errmsg': '用户已存在' }
                ctx.body = result
                return;
            }
            // phone用户不存在 存库
            const data = await this._services.create({ ...params });
            result = res({ data })

        } catch (e) {
            result = err(e)
        }

        ctx.body = result
    }


     // 更新
     updata = async ctx => {
        const params = ctx.request.body
        let result

        try {
            const data = await this._services.update(params.id, { ...params }); 
            result = res({ data })

        } catch (e) {
            result = err(e)
        }

        ctx.body = result
    }

    // 获取列表
    getList = async ctx => {
        let result
        try {
            const data = await this._services.getList(ctx);
            result = res({ data })

        } catch (e) {
            result = err(e)
        }

        ctx.body = result
    }

}

export default new Controller