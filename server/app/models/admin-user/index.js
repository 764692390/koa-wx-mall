import Sequelize from 'sequelize'
import { createSchema } from '../../db'
import BaseModel from '../base-model'

const schema = createSchema('admin_user', {
  userName: Sequelize.STRING,
  password: Sequelize.STRING,
  user_img: Sequelize.STRING,
  status  : Sequelize.INTEGER,
  sort    : Sequelize.INTEGER,
})

class Model extends BaseModel {
  constructor() {
    super(schema)
  }
}

export default Model