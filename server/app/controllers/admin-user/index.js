import { adminUser } from '../../services'
import BaseController from '../base-controller'
import { res, resError, err } from '../../libs/format';
import { MD5 } from '../../libs/base.js'
import jwt from 'jsonwebtoken'
const secret = 'jwt_demo'

class Controller extends BaseController {
    constructor() {
        super(adminUser)
    }

    // 注册
    register = async ctx => {
        const params = ctx.request.body
        let result

        try {
            // 根据 userName 查询用户是否存在    
            const userInfo = await this._services.find({ userName: params.userName });
            if (userInfo !== null) {
                result = { 'errno': 1021, 'errmsg': false, 'errmsg': '用户已存在' }
                ctx.body = result
                return;
            }
            // 用户不存在 存库
            let password =  await MD5(params.password)
            const data = await this._services.create({ ...params, password});
            result = res({ data })

        } catch (e) {
            result = err(e)
        }

        ctx.body = result
    }

    // 登录
    login = async ctx => {
        const params = ctx.request.body
        let result

        try {
            // 根据 userName 查询用户是否存在    
            const userInfo = await this._services.find({ userName: params.userName });
            if (userInfo === null) {
                result = { 'errno': 1022, 'errmsg': false, 'errmsg': '用户不存在' }
                ctx.body = result
                return;  
            }
            if(userInfo !== null && userInfo.userName === params.userName && userInfo.password ===  MD5(params.password)) {
                let user = {
                    userName: userInfo.userName,
                    id: userInfo.id
                }
                let token = jwt.sign(user, secret, { expiresIn: '2h'})
                console.log(token);
                let data = { 'errno': 0, 'errmsg': true, data: userInfo, token } ;
                result = data
            } else {
                result = { 'errno': 1023, 'errmsg': false, 'errmsg': '用户或密码错误' } 
            }

        } catch (e) {
            result = err(e)
        }

        ctx.body = result
    }

    // 获取用户基本信息
    getUserInfo = async ctx => {
        let userInfo = await this._services.tokenToUserInfo(ctx);
        let data = { 'errno': 0, 'errmsg': true, data: userInfo } ;
        ctx.body = data;       
    }

}

export default new Controller