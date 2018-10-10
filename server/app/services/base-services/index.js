import { res, err } from '../../libs/format';


class BaseServices {

    constructor(Model) {
        this._model = new Model
    }

    find = async (id) => {
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
}



export default BaseServices