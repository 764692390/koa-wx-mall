import sequelize  from '../../db'
class BaseModel {
    constructor(schema) {
        this._schema = schema
    }


    _getSort = async () => {
        const sort = await this._schema.max('sort')
        return isNaN(sort) ? 0 : (sort + 1);
    }

    /**
     * 查详情
     * @param {Number} id 
     * @return {Object} 单个Model
     */
    find = async where => {
        return this._schema.find({ where, order: [['sort', 'DESC']] })
    }

    /**
     * 自定义sql
     */
    Query = async sql => {
        return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
    }

    /**
     * 查列表
     * @param {Object} data
     * @return {Array} Model列表
     */
    findAll = async where => {
        console.log(where);
        return this._schema.findAll({ where, order: [['sort', 'DESC']] })
    }

    /**
     * 创建
     * @param {Object} data 
     * @return {Object} 创建成功的对象
     */
    create = async data => {
        const sort = await this._getSort()
        return this._schema.create({ ...data, sort })
    }

    /**
     * 更新
     * @param {Number} id 
     * @param {Object} data
     * @return {Object} 更新后的对象
     */
    update = async (id, data) => {
        return this._schema.update(data, { where: { id } })
    }

    /**
     * 删除
     * @param {Number} id
     * @return {Number} 1|0
     */
    remove = async id => {
        return this._schema.destroy({ where: { id } })
    }

    /**
     * 分页 getList
     * @param 
     * @return 
     */
    getList = async ctx => {
        let index = Math.floor(ctx.query.index) || 1;
        let rows = Math.floor(ctx.query.rows) || 10;

        let data = await this._schema.findAndCountAll({
            order: [['sort', 'DESC']],
            limit: rows,
            offset: (index - 1) * rows,
        });

        data.limit = rows;
        data.offset = index;

        return data;
    }
}

export default BaseModel