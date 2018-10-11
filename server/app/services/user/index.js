import config from '../../config'
import { User } from '../../models'
import BaseServices from '../base-services'
import md5 from 'md5'
import request from 'request'
import uuidv1 from 'uuid/v1';

class Services extends BaseServices {
  constructor() {
    super(User)
  }

  // 创建用户
  create = async params => {
    const data = await this._model.create(params);
    return data 
  }

  //通过OpenId查找用户
  findOpenId = async params => {
    const data = await this._model.findAll(params);
    return data 
  }

  // 通过code获取openId
  getOpenId = code => {
    return new Promise(function (resolve, reject) {
      request({ 
          url: `${config.wx.js_code_url}&appid=${config.wx.appid}&secret=${config.wx.secret}&js_code=${code}`
      }, function (error, response, body) {
        if (!error) {
          let reslut = JSON.parse(response.body)
          resolve(reslut);
        }
        else {
          reject(`===${error}===`);
        }
      });
    })
  }
}

export default Services
