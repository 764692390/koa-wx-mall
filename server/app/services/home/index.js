import { Home } from '../../models'
import BaseServices from '../base-services'
import request from 'request'

const curl = function (fn) {
  return new Promise(function (resolve, reject) {
    fn(resolve, reject)
  })
}



class Services extends BaseServices {
  constructor() {
    super(Home)
  }

  getBanner = async (id) => {
    let data = await curl((resolve,reject) => {
      request('http://m.ehaier.com/sg/cms/indexTop.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body))
        } else {
          reject(error)
        }
      })
    }
    );
    let  topBannerList = data.data.topBannerList
    return topBannerList;
  }
}

export default Services
