import Sequelize from 'sequelize'
import { createSchema } from '../../db'
import BaseModel from '../base-model'

const schema = createSchema('home', {
  title: Sequelize.STRING,
  desc: Sequelize.STRING,
  logoUrl: {
    type: Sequelize.STRING,
    field: 'logo_url'
  },
  linkUrl: {
    type: Sequelize.STRING,
    field: 'link_url'
  },
  status: Sequelize.INTEGER,
  sort: Sequelize.INTEGER,
})

class Model extends BaseModel {
  constructor() {
    super(schema)
  }
}

export default Model