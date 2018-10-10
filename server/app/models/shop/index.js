import Sequelize from 'sequelize'
import { createSchema } from '../../db'
import BaseModel from '../base-model'

const schema = createSchema('shop', {
  goods_name: Sequelize.STRING,
  event_type: Sequelize.INTEGER,
  goods_id: Sequelize.INTEGER,
  price: Sequelize.INTEGER,
  bannerList:{
    type: Sequelize.STRING,
    field: 'hd_thumb_url'
  },
  market_price: Sequelize.INTEGER,
  short_name:Sequelize.STRING,
  thumb_url:Sequelize.STRING,
  status: Sequelize.INTEGER,
  sort: Sequelize.INTEGER,
  attrs:Sequelize.STRING,
  stock:Sequelize.INTEGER,
})

class Model extends BaseModel {
  constructor() {
    super(schema)
  }

  /**
   * 分页 getList
   * @param 
   * @return 
   */
  typeIdGetList = async ctx => {
    let index = Math.floor(ctx.query.index) || 1;
    let rows = Math.floor( ctx.query.rows ) || 10;
    let event_type=ctx.query.event_type;
  
    let data = await this._schema.findAndCountAll({
      where:{ event_type },
      order:  [['sort','DESC']],
      limit: rows,
      offset: (index - 1) * rows,
    });

    data.limit = rows;
    data.offset = index;
    
    return data;
  }
}

export default Model