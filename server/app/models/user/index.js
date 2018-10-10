import Sequelize from 'sequelize'
import { createSchema } from '../../db'
import BaseModel from '../base-model'

const schema = createSchema('user', {
  type: Sequelize.INTEGER,
  uid: Sequelize.STRING,
  userName: Sequelize.STRING,
  phone: Sequelize.STRING,
  password: Sequelize.STRING,
  pic: Sequelize.STRING,
  sort: Sequelize.INTEGER,
  status: Sequelize.INTEGER,
  vip:Sequelize.INTEGER,
})

class Model extends BaseModel {
  constructor() {
    super(schema)
  }
}

export default Model