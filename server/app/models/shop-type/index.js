import Sequelize from 'sequelize'
import { createSchema } from '../../db'
import BaseModel from '../base-model'

const schema = createSchema('shop_type', {
  event_type: Sequelize.INTEGER,
  type_name: Sequelize.STRING,
  status: Sequelize.INTEGER,
  sort: Sequelize.INTEGER,
})

class Model extends BaseModel {
  constructor() {
    super(schema)
  }
}

export default Model