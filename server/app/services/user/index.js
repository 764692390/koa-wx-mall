import { User } from '../../models'
import BaseServices from '../base-services'
import md5 from 'md5'
import uuidv1 from 'uuid/v1';

class Services extends BaseServices {
  constructor() {
    super(User)
  }

  // 创建用户
  create = async params => {

    let password = md5(params.password);
    params.password = password;

    let uid = await uuidv1();

    params.pic = "/images/head/bear.jpg"

    params.uid = uid;

    params.type = 0

    params.vip = 0

    params.status = 1

    const data = await this._model.create(params);
    return data 
  }

  //通过手机号查找用户
  findPhone = async params => {
    const data = await this._model.findAll(params);
    return data 
  }
}

export default Services
