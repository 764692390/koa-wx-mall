import Sequelize from 'sequelize'
import { createSchema } from '../../db'
import BaseModel from '../base-model'

const schema = createSchema('user_log', {
  openId   : Sequelize.STRING,
  nickName : Sequelize.STRING,
  avatarUrl: Sequelize.STRING,
  language : Sequelize.STRING,
  country  : Sequelize.STRING,
  city     : Sequelize.STRING,
  gender   : Sequelize.STRING,
  status   : Sequelize.INTEGER,
  sort     : Sequelize.INTEGER,
  system   : Sequelize.STRING,
  ip       : Sequelize.STRING,
  address  : Sequelize.STRING   
})

class Model extends BaseModel {
  constructor() {
    super(schema)
  }
}

export default Model