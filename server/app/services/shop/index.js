import { Shop, ShopBanner, ShopSku, ShopType } from '../../models'
import BaseServices from '../base-services'
import request from 'request'

const curl = function (fn) {
  return new Promise(function (resolve, reject) {
    fn(resolve, reject)
  })
}


class Services extends BaseServices {
  constructor() {
    super(Shop);

    this._ShopBanner = new ShopBanner();
    this._ShopSku = new ShopSku();
    this._ShopType = new ShopType();

  }

  findAllData = async where => {
    const data = await this._model.findAll(where)
    return data
  }

  getData = async () => {
    let data = await curl((resolve, reject) => {
      request('https://apiv2.pinduoduo.com/operation/1/groups?opt_type=1&offset=0&size=20', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body))
        } else {
          reject(error)
        }
      })
    }
    );

    return data;
  }
  // 获取商品详情
  Detail = async ctx => {
    const goods_id = ctx.params.id;
    let item = await this._model.findAll({ goods_id });

    if (item.length > 0) {
      let items = item[0];
      //获取轮播图
      let banner = await this._ShopBanner.findAll({ goods_id });
      items.bannerList = banner;

      //判断当前商品是否有属性, 库存为-1时候说明有属性
      if (items.stock == -1) {

        items.stock = false;
        let attr = items.attrs.split(',');

        let attrs = await this._ShopSku.findAll({
          id: [...attr]
        })

        items.attrs = attrs;

      } else {

        items.attrs = false;
      }

      return items;
    } else {
      // 商品id不存在
      return { code: 1030 };
    }
  }

  // 分类
  BranchType = async ctx => {
    let item = await this._ShopType.findAll();
    return item;
  }

  //分类详情
  BranchTypeDetail = async ctx =>{
    let item = await this._model.typeIdGetList(ctx);
    console.log(item);
    return item;
  }

}

export default Services
