import { res, err } from '../../libs/format';
import { CURL } from '../../util/index.js';


class BaseServices {

    constructor(Model) {
        this._model = new Model
    }

    find = async (id) => {
        console.log(id)
        const data = await this._model.find(id)
        return data
    }

    findAll = async ctx => {
        const data = await this._model.findAll(ctx.query)
        return data
    }

    create = async params => {
        const data = await this._model.create(params);
        return data 
    }

    update = async (id, params) => {
        const data = await this._model.update(id, params)
        return data 
    }

    patch = async (id, params) => {
        const data = await this._model.update(id, params)
        return data 
    }

    remove = async id => {
        const data = await this._model.remove(id)
        return data 
    }

    /* 分页 */
    getList = async ctx => {
        const data = await this._model.getList(ctx)
        return data 
    }

    /*获取ip */
    getIp = async ctx => {
        let ip = await ctx.header['x-forwarded-for'].split(',')[0] || ctx.header['x-real-ip'];
        let ipquery = await CURL({ param: { ip }, url: 'http://ip.360.cn/IPQuery/ipquery'})
        ipquery = JSON.parse(ipquery);
        let res = {
            ip,
            address: ipquery.data
        }
        return res;
    }
}



export default BaseServices