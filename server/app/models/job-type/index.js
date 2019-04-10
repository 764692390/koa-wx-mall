import Sequelize from 'sequelize'
import { createSchema } from '../../db'
import BaseModel from '../base-model'

const schema = createSchema('job_type', {
  name: Sequelize.STRING,
  job_type: Sequelize.INTEGER,
  sort: Sequelize.INTEGER
})

class Model extends BaseModel {
  constructor() {
    super(schema)
  }
}

export default Model