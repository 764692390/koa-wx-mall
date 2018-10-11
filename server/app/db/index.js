import Sequelize from 'sequelize'
import { database, user, pass, options } from './config'

const sequelize = new Sequelize(database, user, pass, options);

// 公共字段
const baseFields = {
  createdAt: {
    type: Sequelize.DATE,
    field: 'create_time'
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'update_time'
  },
}

const createSchema = (table, fields, options = { freezeTableName: true }) => {
  return sequelize.define(table, {
    ...baseFields,
    ...fields,
  }, options)
}
 
// test connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Sequelize: Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Sequelize: Unable to connect to the database:', err);
  });

export { createSchema }
export default sequelize