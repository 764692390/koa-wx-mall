import { adminUser } from '../../models'
import BaseServices from '../base-services'
import jwt from 'jsonwebtoken'
import util from 'util'

const secret = 'jwt_demo'
const verify = util.promisify(jwt.verify)


class Services extends BaseServices {
    constructor() {
        super(adminUser)
    }

    //通过 token获取用户基本信息
    tokenToUserInfo = async ctx => {
        try {
            const token = ctx.header.authorization  // 获取jwt
            console.log(token)
            if (token) {
                let payload
                try {
                    payload = await verify(token.split(' ')[1], secret)  // 解密payload，获取用户名和ID
                    let id = payload.id;
                    let userInfo = await this.find({id});
                    return userInfo;
                } catch (err) {
                    console.log('token verify fail: ', err)
                }
            }
        } catch (err) {
            if (err.status === 401) {
                ctx.body = {
                    code: -1,
                    message: '认证失败'
                }
            } else {
                err.status = 404
                ctx.body = '404'
                console.log('不服就是怼：', err)
            }
        }
    }
}

export default Services
