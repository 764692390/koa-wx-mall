import { User } from '../../services'
import BaseController from '../base-controller'
import { res, err } from '../../libs/format';
import { setPngCode } from '../../libs/captchapng';
import md5 from 'md5';

class Controller extends BaseController {
  constructor() {
    super(User)
  }
  //获取当前用户
  getUser = async ctx => {
    let result
      if( ctx.session.user ){
        ctx.body  = { 'errno': 0, 'errmsg': 'success',data: ctx.session.user }
      } else {
        ctx.body  = { 'errno': 10080, 'errmsg': '用户未登录！' }
      }
  }
  // 退出
  signOut = async ctx => {
    console.log(ctx.session);
    ctx.session =  await {};
    ctx.body  = { 'errno': 0, 'errmsg': '用户退出成功' }
    console.log(ctx.session);
  }
  // 设置code
  setCode = async ctx => {
    let code = await setPngCode();
    ctx.session.code = code.code;
    ctx.response.type = "image/png";
    ctx.response.body = code.imgbase64;
  }
  // 注册
  register = async ctx => {
    const params = ctx.request.body
    let result

    try {

      if (params.password !== params.passwordConfirm) {
        result = { 'errno': 1020, 'errmsg': '两次密码输入不一致' }
        ctx.body = result
        return;
      }

      const findPhone = await this._services.findPhone({ phone: params.phone });
      if (findPhone.length > 0) {
        result = { 'errno': 1021, 'errmsg': '用户已存在' }
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
  // 登录
  signIn = async ctx => {
    const params = ctx.request.body
    let result,Users,Password;

    try {
      if (params.password.length === 0) {
        result = { 'errno': 1030, 'errmsg': '请输入密码' }
        ctx.body = result
        return;
      }

      if (params.phone.length !== 11) {
        result = { 'errno': 1031, 'errmsg': '手机号不对' }
        ctx.body = result
        return;
      }

      if (params.code != ctx.session.code) {
        result = { 'errno': 1032, 'errmsg': '验证码不对' }
        ctx.body = result
        return;
      }

      const findPhone = await this._services.findPhone({ phone: params.phone });

      if(findPhone.length === 0){
        result = { 'errno': 1040, 'errmsg': '当前帐号不存在！' }
        ctx.body = result
        return;
      }else if(findPhone.length === 1) {
        Users = {
          phone: findPhone[0].phone,
          uid: findPhone[0].uid,
          userName: findPhone[0].userName,
          type: findPhone[0].type,
          pic: findPhone[0].pic,
          vip: findPhone[0].vip,
          status: findPhone[0].status
        }
        Password =findPhone[0].password;
      }else{
        result = { 'errno': 1041, 'errmsg': '当前帐号异常！' }
        ctx.body = result
        return;
      }
      

      if(Users.phone === params.phone &&  Password === md5(params.password)){
        result = { 'errno': 0, 'errmsg': '登录成功' }
        ctx.session.user = Users;

      }else{
        result = { 'errno': 1042, 'errmsg': '密码错误' }
      }
     
    } catch (e) {
      result = err(e)
    }

    ctx.body = result

  }
}

export default new Controller