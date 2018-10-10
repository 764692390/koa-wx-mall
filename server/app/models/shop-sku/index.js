import Sequelize from 'sequelize'
import { createSchema } from '../../db'
import BaseModel from '../base-model'

const schema = createSchema('shop_sku', {
  attr_type: Sequelize.INTEGER,
  attr_name: Sequelize.STRING,
  stock: Sequelize.INTEGER,
  stock_name: Sequelize.STRING,
  status: Sequelize.INTEGER,
  sort: Sequelize.INTEGER,
})

class Model extends BaseModel {
  constructor() {
    super(schema)
  }
}

export default Model